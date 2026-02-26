import { AuthService } from "../model.service/AuthService";
import { AuthenticatePresenter, AuthView } from "./AuthenticatePresenter";

export class LoginPresenter extends AuthenticatePresenter {
  private authService = new AuthService();

  public constructor(view: AuthView) {
    super(view);
  }

  public checkSubmitButtonStatus(alias: string, password: string): boolean {
    return !alias || !password;
  }

  public async login(
    alias: string,
    password: string,
    rememberMe: boolean,
    originalUrl?: string,
  ): Promise<void> {
    await this.authenticate(
      "log user in",
      rememberMe,
      () => this.authService.login(alias, password),
      (user) => originalUrl ?? `/feed/${user.alias}`,
    );
  }
}
