import { AuthToken, User } from "tweeter-shared";
import { AuthService } from "../model.service/AuthService";

export interface RegisterView {
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

export class RegisterPresenter {
  private authService: AuthService;

  public constructor(private view: RegisterView) {
    this.authService = new AuthService();
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
    try {
      this.view.setIsLoading(true);

      const [user, authToken] = await this.authService.register(
        firstName,
        lastName,
        alias,
        password,
        imageBytes,
        imageFileExtension,
      );

      this.view.updateUserInfo(user, user, authToken, rememberMe);
      this.view.navigate(`/feed/${user.alias}`);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to register user because of exception: ${error}`,
      );
    } finally {
      this.view.setIsLoading(false);
    }
  }
}
