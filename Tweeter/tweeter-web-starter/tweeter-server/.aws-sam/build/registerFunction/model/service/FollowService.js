"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
class FollowService {
    async loadMoreFollowees(token, userAlias, pageSize, lastItem) {
        return this.getFakeData(lastItem, pageSize, userAlias);
    }
    async loadMoreFollowers(token, userAlias, pageSize, lastItem) {
        return this.getFakeData(lastItem, pageSize, userAlias);
    }
    async getFakeData(lastItem, pageSize, userAlias) {
        const [items, hasMore] = tweeter_shared_1.FakeData.instance.getPageOfUsers(tweeter_shared_1.User.fromDto(lastItem), pageSize, userAlias);
        const dtos = items.map((user) => user.dto);
        return [dtos, hasMore];
    }
    async getIsFollowerStatus(token, userAlias, selectedUserAlias) {
        return tweeter_shared_1.FakeData.instance.isFollower();
    }
    async getFolloweeCount(token, userAlias) {
        return tweeter_shared_1.FakeData.instance.getFolloweeCount(userAlias);
    }
    async getFollowerCount(token, userAlias) {
        return tweeter_shared_1.FakeData.instance.getFollowerCount(userAlias);
    }
    async follow(token, user) {
        await new Promise((f) => setTimeout(f, 2000));
    }
    async unfollow(token, user) {
        await new Promise((f) => setTimeout(f, 2000));
    }
}
exports.FollowService = FollowService;
