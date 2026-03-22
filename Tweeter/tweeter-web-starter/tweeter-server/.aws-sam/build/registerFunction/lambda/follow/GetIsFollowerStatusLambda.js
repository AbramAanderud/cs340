"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const FollowService_1 = require("../../model/service/FollowService");
const handler = async (request) => {
    const followService = new FollowService_1.FollowService();
    const isFollower = await followService.getIsFollowerStatus(request.token, request.userAlias, request.selectedUserAlias);
    return {
        success: true,
        message: null,
        isFollower,
    };
};
exports.handler = handler;
