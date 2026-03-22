import {
  AuthToken,
  FollowActionRequest,
  FollowActionResponse,
  GetCountRequest,
  IsFollowerStatusRequest,
  PagedUserItemRequest,
  User,
} from "tweeter-shared";
import { ServerFacade } from "../network/ServerFacade";
import { Service } from "./Service";

export class FollowService implements Service {
  private serverFacade = new ServerFacade();

  public async loadMoreFollowees(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null,
  ): Promise<[User[], boolean]> {
    const request: PagedUserItemRequest = {
      token: authToken.token,
      userAlias,
      pageSize,
      lastItem: lastItem ? lastItem.dto : null,
    };

    return this.serverFacade.getMoreFollowees(request);
  }

  public async loadMoreFollowers(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null,
  ): Promise<[User[], boolean]> {
    const request: PagedUserItemRequest = {
      token: authToken.token,
      userAlias,
      pageSize,
      lastItem: lastItem ? lastItem.dto : null,
    };

    return this.serverFacade.getMoreFollowers(request);
  }

  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User,
  ): Promise<boolean> {
    const request: IsFollowerStatusRequest = {
      token: authToken.token,
      userAlias: user.alias,
      selectedUserAlias: selectedUser.alias,
    };

    return this.serverFacade.getIsFollowerStatus(request);
  }

  public async getFolloweeCount(authToken: AuthToken, user: User): Promise<number> {
    const request: GetCountRequest = {
      token: authToken.token,
      userAlias: user.alias,
    };

    return this.serverFacade.getFolloweeCount(request);
  }

  public async getFollowerCount(authToken: AuthToken, user: User): Promise<number> {
    const request: GetCountRequest = {
      token: authToken.token,
      userAlias: user.alias,
    };

    return this.serverFacade.getFollowerCount(request);
  }

  public async follow(authToken: AuthToken, userToFollow: User): Promise<void> {
    const request: FollowActionRequest = {
      token: authToken.token,
      user: userToFollow.dto,
    };

    await this.serverFacade.follow(request);
  }

  public async unfollow(authToken: AuthToken, userToUnfollow: User): Promise<void> {
    const request: FollowActionRequest = {
      token: authToken.token,
      user: userToUnfollow.dto,
    };

    await this.serverFacade.unfollow(request);
  }
}
