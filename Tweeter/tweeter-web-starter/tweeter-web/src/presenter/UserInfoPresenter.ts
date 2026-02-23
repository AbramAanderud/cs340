import { AuthToken, User } from "tweeter-shared";
import { FollowService } from "../model.service/FollowService";

export interface UserInfoView {
  setIsFollower: (value: boolean) => void;
  setFollowerCount: (value: number) => void;
  setFolloweeCount: (value: number) => void;
  setIsLoading: (value: boolean) => void;

  displayErrorMessage: (message: string) => void;
  displayInfoMessage: (message: string, duration: number) => string;
  deleteMessage: (id: string) => void;
}

export class UserInfoPresenter {
  private followService: FollowService;

  public constructor(private view: UserInfoView) {
    this.followService = new FollowService();
  }

  public async loadUserInfo(
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User,
  ): Promise<void> {
    try {
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
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load user info because of exception: ${error}`,
      );
    }
  }

  public async follow(
    authToken: AuthToken,
    displayedUser: User,
  ): Promise<void> {
    let toastId = "";

    try {
      this.view.setIsLoading(true);
      toastId = this.view.displayInfoMessage(
        `Following ${displayedUser.name}...`,
        0,
      );

      await this.followService.follow(authToken, displayedUser);

      const [followeeCount, followerCount] = await Promise.all([
        this.followService.getFolloweeCount(authToken, displayedUser),
        this.followService.getFollowerCount(authToken, displayedUser),
      ]);

      this.view.setIsFollower(true);
      this.view.setFolloweeCount(followeeCount);
      this.view.setFollowerCount(followerCount);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to follow user because of exception: ${error}`,
      );
    } finally {
      if (toastId) {
        this.view.deleteMessage(toastId);
      }
      this.view.setIsLoading(false);
    }
  }

  public async unfollow(
    authToken: AuthToken,
    displayedUser: User,
  ): Promise<void> {
    let toastId = "";

    try {
      this.view.setIsLoading(true);
      toastId = this.view.displayInfoMessage(
        `Unfollowing ${displayedUser.name}...`,
        0,
      );

      await this.followService.unfollow(authToken, displayedUser);

      const [followeeCount, followerCount] = await Promise.all([
        this.followService.getFolloweeCount(authToken, displayedUser),
        this.followService.getFollowerCount(authToken, displayedUser),
      ]);

      this.view.setIsFollower(false);
      this.view.setFolloweeCount(followeeCount);
      this.view.setFollowerCount(followerCount);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to unfollow user because of exception: ${error}`,
      );
    } finally {
      if (toastId) {
        this.view.deleteMessage(toastId);
      }
      this.view.setIsLoading(false);
    }
  }
}
