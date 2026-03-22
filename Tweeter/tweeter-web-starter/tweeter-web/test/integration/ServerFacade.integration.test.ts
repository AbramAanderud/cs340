import "isomorphic-fetch";

import { GetCountRequest, PagedUserItemRequest, RegisterRequest } from "tweeter-shared";
import { ServerFacade } from "../../src/network/ServerFacade";

describe("ServerFacade integration tests", () => {
  const serverFacade = new ServerFacade();

  test("register returns user and auth token", async () => {
    const request: RegisterRequest = {
      firstName: "Test",
      lastName: "User",
      alias: "@testuser",
      password: "password",
      userImageBase64: "",
      imageFileExtension: "png",
    };

    const [user, authToken] = await serverFacade.register(request);

    expect(user).not.toBeNull();
    expect(authToken).not.toBeNull();

    expect(user.firstName).toBe("Allen");
    expect(user.lastName).toBe("Anderson");
    expect(user.alias).toBe("@allen");
  });

  test("getFollowers returns a page of followers", async () => {
    const request: PagedUserItemRequest = {
      token: "test-token",
      userAlias: "@allen",
      pageSize: 10,
      lastItem: null,
    };

    const [followers, hasMore] = await serverFacade.getMoreFollowers(request);

    expect(followers).not.toBeNull();
    expect(Array.isArray(followers)).toBe(true);
    expect(followers.length).toBeGreaterThan(0);
    expect(typeof hasMore).toBe("boolean");
  });

  test("getFollowerCount returns a value greater than zero", async () => {
    const request: GetCountRequest = {
      token: "test-token",
      userAlias: "@allen",
    };

    const count = await serverFacade.getFollowerCount(request);

    expect(count).toBeGreaterThan(0);
  });
});
