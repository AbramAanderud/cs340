import { FollowActionRequest, FollowActionResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (request: FollowActionRequest): Promise<FollowActionResponse> => {
  const followService = new FollowService();
  await followService.follow(request.token, request.user);

  return {
    success: true,
    message: null,
  };
};
