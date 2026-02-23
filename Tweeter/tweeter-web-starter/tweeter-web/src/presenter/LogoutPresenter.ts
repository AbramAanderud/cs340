import { AuthToken } from "tweeter-shared";
import { AuthService } from "../model.service/AuthService";

export interface LogoutView {
  displayInfoMessage: (message: string, duration: number) => string;
  displayErrorMessage: (message: string) => void;
  deleteMessage: (id: string) => void;

  clearUserInfo: () => void;
  navigate: (path: string) => void;
}

export class LogoutPresenter {
  private authService: AuthService;

  public constructor(private view: LogoutView) {
    this.authService = new AuthService();
  }

  public async logout(authToken: AuthToken): Promise<void> {
    const toastId = this.view.displayInfoMessage("Logging Out...", 0);

    try {
      await this.authService.logout(authToken);

      this.view.deleteMessage(toastId);
      this.view.clearUserInfo();
      this.view.navigate("/login");
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user out because of exception: ${error}`,
      );
    }
  }
}
