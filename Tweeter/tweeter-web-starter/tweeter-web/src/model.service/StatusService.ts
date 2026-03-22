import {
  AuthToken,
  PagedStatusItemRequest,
  PostStatusRequest,
  Status,
  StatusDto,
  User,
} from "tweeter-shared";
import { ServerFacade } from "../network/ServerFacade";
import { Service } from "./Service";

export class StatusService implements Service {
  private serverFacade = new ServerFacade();

  public async loadMoreFeedItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null,
  ): Promise<[Status[], boolean]> {
    const request: PagedStatusItemRequest = {
      token: authToken.token,
      userAlias: user.alias,
      pageSize,
      lastItem: lastItem ? lastItem.dto : null,
    };

    return this.serverFacade.getMoreFeedItems(request);
  }

  public async loadMoreStoryItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null,
  ): Promise<[Status[], boolean]> {
    const request: PagedStatusItemRequest = {
      token: authToken.token,
      userAlias: user.alias,
      pageSize,
      lastItem: lastItem ? lastItem.dto : null,
    };

    return this.serverFacade.getMoreStoryItems(request);
  }

  public async postStatus(authToken: AuthToken, newStatus: Status): Promise<void> {
    const request: PostStatusRequest = {
      token: authToken.token,
      newStatus: newStatus.dto,
    };

    await this.serverFacade.postStatus(request);
  }
}
