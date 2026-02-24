import { AuthToken } from "tweeter-shared";
import { AuthService } from "../model.service/AuthService";
import { MessageView, Presenter } from "./Presenter";

export interface LogoutView extends MessageView {
  clearUserInfo: () => void;
  navigate: (path: string) => void;
}

export class LogoutPresenter extends Presenter<LogoutView> {
  private authService = new AuthService();

  public constructor(view: LogoutView) {
    super(view);
  }

  public async logout(authToken: AuthToken): Promise<void> {
    const toastId = this.view.displayInfoMessage("Logging Out...", 0);

    await this.doFailureReportingOperation(async () => {
      await this.authService.logout(authToken);

      this.view.clearUserInfo();
      this.view.navigate("/login");
    }, "log user out");

    this.view.deleteMessage(toastId);
  }
}
