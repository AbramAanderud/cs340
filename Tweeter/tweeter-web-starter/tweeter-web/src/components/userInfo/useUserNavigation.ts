import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "./UserInfoHooks";
import {
  UserNavigationPresenter,
  UserNavigationView,
} from "../../presenter/UserNavigationPresenter";

export const useUserNavigation = (featurePath: string) => {
  const navigate = useNavigate();

  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();

  const listener: UserNavigationView = {
    setDisplayedUser,
    navigate,
    displayErrorMessage,
  };

  const presenterRef = useRef<UserNavigationPresenter | null>(null);
  if (!presenterRef.current) {
    presenterRef.current = new UserNavigationPresenter(listener);
  }

  const navigateToAlias = async (rawAlias: string): Promise<void> => {
    await presenterRef.current!.navigateToAlias(
      authToken!,
      displayedUser!,
      featurePath,
      rawAlias,
    );
  };

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    const text = (event.currentTarget as HTMLElement).textContent ?? "";
    await navigateToAlias(text);
  };

  return { navigateToUser, navigateToAlias };
};
