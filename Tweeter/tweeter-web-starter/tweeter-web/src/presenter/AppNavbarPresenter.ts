import { AuthToken } from "tweeter-shared";
import { AuthService } from "../model.service/AuthService";
import { MessageView, Presenter } from "./Presenter";

export interface AppNavbarView extends MessageView {
  clearUserInfo: () => void;
  navigate: (path: string) => void;
}

export class AppNavbarPresenter extends Presenter<AppNavbarView> {
  private _service = new AuthService();

  public constructor(view: AppNavbarView) {
    super(view);
    this._service = new AuthService();
  }

  public get service() {
    return this._service;
  }

  public async logout(authToken: AuthToken): Promise<void> {
    this.doFailureReportingOperation(async () => {
      const toastId = this.view.displayInfoMessage("Logging Out...", 0);

      await this.service.logout(authToken);

      this.view.deleteMessage(toastId);
      this.view.clearUserInfo();
      this.view.navigate("/login");
    }, "log user out");
  }
}
