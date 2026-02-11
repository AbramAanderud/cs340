import { useNavigate } from "react-router-dom";
import { AuthToken, FakeData, User } from "tweeter-shared";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "./UserInfoHooks";

export const useUserNavigation = (featurePath: string) => {
  const navigate = useNavigate();

  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();

  const extractAlias = (value: string): string => {
    const at = value.indexOf("@");
    return at >= 0 ? value.substring(at) : value;
  };

  const getUser = async (
    token: AuthToken,
    alias: string,
  ): Promise<User | null> => {
    return FakeData.instance.findUserByAlias(alias);
  };

  const navigateToAlias = async (rawAlias: string): Promise<void> => {
    try {
      const alias = extractAlias(rawAlias);

      const toUser = await getUser(authToken!, alias);

      if (toUser && !toUser.equals(displayedUser!)) {
        setDisplayedUser(toUser);
        navigate(`${featurePath}/${toUser.alias}`);
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    const text = (event.currentTarget as HTMLElement).textContent ?? "";
    await navigateToAlias(text);
  };

  return { navigateToUser, navigateToAlias };
};
