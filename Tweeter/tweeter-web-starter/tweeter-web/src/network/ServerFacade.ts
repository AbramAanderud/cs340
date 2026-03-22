import {
  AuthResponse,
  FollowActionRequest,
  FollowActionResponse,
  GetCountRequest,
  GetCountResponse,
  GetUserRequest,
  GetUserResponse,
  IsFollowerStatusRequest,
  IsFollowerStatusResponse,
  LoginRequest,
  LogoutRequest,
  LogoutResponse,
  PagedUserItemRequest,
  PagedUserItemResponse,
  RegisterRequest,
  User,
  PagedStatusItemRequest,
  PagedStatusItemResponse,
  PostStatusRequest,
  PostStatusResponse,
  Status,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private SERVER_URL = "https://ifwk0rrf6c.execute-api.us-west-2.amazonaws.com/Stage";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  public async getMoreFollowees(request: PagedUserItemRequest): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(request, "/followee/list");

    const items =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    if (!response.success || items == null) {
      throw new Error(response.message ?? "No followees found");
    }

    return [items, response.hasMore];
  }

  public async getMoreFollowers(request: PagedUserItemRequest): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
    >(request, "/follower/list");

    const items =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    if (!response.success || items == null) {
      throw new Error(response.message ?? "No followers found");
    }

    return [items, response.hasMore];
  }

  public async login(request: LoginRequest): Promise<[User, string]> {
    const response = await this.clientCommunicator.doPost<LoginRequest, AuthResponse>(
      request,
      "/auth/login",
    );

    if (!response.success || response.user == null || response.authToken == null) {
      throw new Error(response.message ?? "Login failed");
    }

    return [User.fromDto(response.user) as User, response.authToken];
  }

  public async register(request: RegisterRequest): Promise<[User, string]> {
    const response = await this.clientCommunicator.doPost<RegisterRequest, AuthResponse>(
      request,
      "/auth/register",
    );

    if (!response.success || response.user == null || response.authToken == null) {
      throw new Error(response.message ?? "Register failed");
    }

    return [User.fromDto(response.user) as User, response.authToken];
  }

  public async logout(request: LogoutRequest): Promise<void> {
    const response = await this.clientCommunicator.doPost<LogoutRequest, LogoutResponse>(
      request,
      "/auth/logout",
    );

    if (!response.success) {
      throw new Error(response.message ?? "Logout failed");
    }
  }

  public async getUser(request: GetUserRequest): Promise<User | null> {
    const response = await this.clientCommunicator.doPost<GetUserRequest, GetUserResponse>(
      request,
      "/user/get",
    );

    if (!response.success) {
      throw new Error(response.message ?? "Get user failed");
    }

    return User.fromDto(response.user);
  }

  public async getFollowerCount(request: GetCountRequest): Promise<number> {
    const response = await this.clientCommunicator.doPost<GetCountRequest, GetCountResponse>(
      request,
      "/follower/count",
    );

    if (!response.success) {
      throw new Error(response.message ?? "Get follower count failed");
    }

    return response.count;
  }

  public async getFolloweeCount(request: GetCountRequest): Promise<number> {
    const response = await this.clientCommunicator.doPost<GetCountRequest, GetCountResponse>(
      request,
      "/followee/count",
    );

    if (!response.success) {
      throw new Error(response.message ?? "Get followee count failed");
    }

    return response.count;
  }

  public async getIsFollowerStatus(request: IsFollowerStatusRequest): Promise<boolean> {
    const response = await this.clientCommunicator.doPost<
      IsFollowerStatusRequest,
      IsFollowerStatusResponse
    >(request, "/follow/status");

    if (!response.success) {
      throw new Error(response.message ?? "Get follower status failed");
    }

    return response.isFollower;
  }

  public async follow(request: FollowActionRequest): Promise<void> {
    const response = await this.clientCommunicator.doPost<
      FollowActionRequest,
      FollowActionResponse
    >(request, "/follow/create");

    if (!response.success) {
      throw new Error(response.message ?? "Follow failed");
    }
  }

  public async unfollow(request: FollowActionRequest): Promise<void> {
    const response = await this.clientCommunicator.doPost<
      FollowActionRequest,
      FollowActionResponse
    >(request, "/follow/remove");

    if (!response.success) {
      throw new Error(response.message ?? "Unfollow failed");
    }
  }

  public async getMoreFeedItems(request: PagedStatusItemRequest): Promise<[Status[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedStatusItemRequest,
      PagedStatusItemResponse
    >(request, "/status/feed");

    const items =
      response.success && response.items
        ? response.items.map((dto) => Status.fromDto(dto) as Status)
        : null;

    if (!response.success || items == null) {
      throw new Error(response.message ?? "No feed items found");
    }

    return [items, response.hasMore];
  }

  public async getMoreStoryItems(request: PagedStatusItemRequest): Promise<[Status[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedStatusItemRequest,
      PagedStatusItemResponse
    >(request, "/status/story");

    const items =
      response.success && response.items
        ? response.items.map((dto) => Status.fromDto(dto) as Status)
        : null;

    if (!response.success || items == null) {
      throw new Error(response.message ?? "No story items found");
    }

    return [items, response.hasMore];
  }

  public async postStatus(request: PostStatusRequest): Promise<void> {
    const response = await this.clientCommunicator.doPost<PostStatusRequest, PostStatusResponse>(
      request,
      "/status/post",
    );

    if (!response.success) {
      throw new Error(response.message ?? "Post status failed");
    }
  }
}
