import "isomorphic-fetch";

import { AuthToken, User } from "tweeter-shared";
import { StatusService } from "../../src/model.service/StatusService";

describe("StatusService integration tests", () => {
  const statusService = new StatusService();

  test("loadMoreStoryItems returns a successful page of story statuses", async () => {
    const authToken = new AuthToken("test-token", Date.now());
    const user = new User("Allen", "Anderson", "@allen", "https://some-url");

    const [statuses, hasMore] = await statusService.loadMoreStoryItems(authToken, user, 10, null);

    expect(statuses).not.toBeNull();
    expect(Array.isArray(statuses)).toBe(true);
    expect(statuses.length).toBeGreaterThan(0);
    expect(typeof hasMore).toBe("boolean");
    expect(statuses[0].post).toBeTruthy();
  });
});
