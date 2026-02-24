import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface AuthView extends View {
  setIsLoading: (value: boolean) => void;

  updateUserInfo: (
    currentUser: User,
    displayedUser: User,
    authToken: AuthToken,
    rememberMe: boolean,
  ) => void;

  navigate: (path: string) => void;
}

export abstract class AuthenticatePresenter extends Presenter<AuthView> {
  protected async authenticate(
    operationDescription: string,
    rememberMe: boolean,
    authOperation: () => Promise<[User, AuthToken]>,
    getNavigatePath: (user: User) => string,
  ): Promise<void> {
    this.view.setIsLoading(true);

    await this.doFailureReportingOperation(async () => {
      const [user, authToken] = await authOperation();
      this.view.updateUserInfo(user, user, authToken, rememberMe);
      this.view.navigate(getNavigatePath(user));
    }, operationDescription);

    this.view.setIsLoading(false);
  }
}
