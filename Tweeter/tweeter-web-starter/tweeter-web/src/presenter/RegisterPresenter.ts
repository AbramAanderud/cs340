import { AuthService } from "../model.service/AuthService";
import { AuthenticatePresenter, AuthView } from "./AuthenticatePresenter";

export class RegisterPresenter extends AuthenticatePresenter {
  private authService = new AuthService();

  public constructor(view: AuthView) {
    super(view);
  }

  public checkSubmitButtonStatus(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageUrl: string,
    imageFileExtension: string,
  ): boolean {
    return (
      !firstName ||
      !lastName ||
      !alias ||
      !password ||
      !imageUrl ||
      !imageFileExtension
    );
  }

  public async doRegister(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageBytes: Uint8Array,
    imageFileExtension: string,
    rememberMe: boolean,
  ): Promise<void> {
    await this.authenticate(
      "register user",
      rememberMe,
      () =>
        this.authService.register(
          firstName,
          lastName,
          alias,
          password,
          imageBytes,
          imageFileExtension,
        ),
      (user) => `/feed/${user.alias}`,
    );
  }
}
