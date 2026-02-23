import { AuthToken, User } from "tweeter-shared";
import { AuthService } from "../model.service/AuthService";

export interface LoginView {
  setIsLoading: (value: boolean) => void;
  displayErrorMessage: (message: string) => void;

  updateUserInfo: (
    currentUser: User,
    displayedUser: User,
    authToken: AuthToken,
    rememberMe: boolean,
  ) => void;

  navigate: (path: string) => void;
}

export class LoginPresenter {
  private authService: AuthService;

  public constructor(private view: LoginView) {
    this.authService = new AuthService();
  }

  public checkSubmitButtonStatus(alias: string, password: string): boolean {
    return !alias || !password;
  }

  public async doLogin(
    alias: string,
    password: string,
    rememberMe: boolean,
    originalUrl?: string,
  ): Promise<void> {
    try {
      this.view.setIsLoading(true);

      const [user, authToken] = await this.authService.login(alias, password);

      this.view.updateUserInfo(user, user, authToken, rememberMe);

      if (!!originalUrl) {
        this.view.navigate(originalUrl);
      } else {
        this.view.navigate(`/feed/${user.alias}`);
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`,
      );
    } finally {
      this.view.setIsLoading(false);
    }
  }
}
