import { useContext } from "react";
import { UserInfoActionsContext, UserInfoContext } from "./UserInfoContexts";
import { User, AuthToken } from "tweeter-shared";

interface UserInfoState {
  currentUser: User | null;
  displayedUser: User | null;
  authToken: AuthToken | null;
}

interface UserInfoActions {
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  clearUserInfo: () => void;
  setDisplayedUser: (user: User) => void;
}

export const useUserInfo = (): UserInfoState => {
  return useContext(UserInfoContext);
};

export const useUserInfoActions = (): UserInfoActions => {
  return useContext(UserInfoActionsContext);
};
