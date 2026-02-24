import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model.service/FollowService";
import { MessageView, Presenter } from "./Presenter";

export interface UserInfoView extends MessageView {
  setIsFollower: (value: boolean) => void;
  setFollowerCount: (value: number) => void;
  setFolloweeCount: (value: number) => void;
  setIsLoading: (value: boolean) => void;
}

export class UserInfoPresenter extends Presenter<UserInfoView> {
  private followService = new FollowService();

  public constructor(view: UserInfoView) {
    super(view);
  }

  public async loadUserInfo(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User,
  ): Promise<void> {
    await this.doFailureReportingOperation(async () => {
      const [followeeCount, followerCount] = await Promise.all([
        this.followService.getFolloweeCount(authToken, displayedUser),
        this.followService.getFollowerCount(authToken, displayedUser),
      ]);

      this.view.setFolloweeCount(followeeCount);
      this.view.setFollowerCount(followerCount);

      if (displayedUser.equals(currentUser)) {
        this.view.setIsFollower(false);
      } else {
        const isFollower = await this.followService.getIsFollowerStatus(
          authToken,
          currentUser,
          displayedUser,
        );
        this.view.setIsFollower(isFollower);
      }
    }, "load user info");
  }

  public async follow(
    authToken: AuthToken,
    displayedUser: User,
  ): Promise<void> {
    await this.doFollowChange(
      authToken,
      displayedUser,
      () => this.followService.follow(authToken, displayedUser),
      `Following ${displayedUser.name}...`,
      true,
      "follow user",
    );
  }

  public async unfollow(
    authToken: AuthToken,
    displayedUser: User,
  ): Promise<void> {
    await this.doFollowChange(
      authToken,
      displayedUser,
      () => this.followService.unfollow(authToken, displayedUser),
      `Unfollowing ${displayedUser.name}...`,
      false,
      "unfollow user",
    );
  }

  private async doFollowChange(
    authToken: AuthToken,
    displayedUser: User,
    operation: () => Promise<void>,
    toastMessage: string,
    isFollowerAfter: boolean,
    operationDescription: string,
  ): Promise<void> {
    let toastId = "";

    this.view.setIsLoading(true);
    toastId = this.view.displayInfoMessage(toastMessage, 0);

    await this.doFailureReportingOperation(async () => {
      await operation();

      const [followeeCount, followerCount] = await Promise.all([
        this.followService.getFolloweeCount(authToken, displayedUser),
        this.followService.getFollowerCount(authToken, displayedUser),
      ]);

      this.view.setIsFollower(isFollowerAfter);
      this.view.setFolloweeCount(followeeCount);
      this.view.setFollowerCount(followerCount);
    }, operationDescription);

    if (toastId) this.view.deleteMessage(toastId);
    this.view.setIsLoading(false);
  }
}
