import { TweeterRequest } from "./TweeterRequest";

export interface IsFollowerStatusRequest extends TweeterRequest {
  readonly userAlias: string;
  readonly selectedUserAlias: string;
}
