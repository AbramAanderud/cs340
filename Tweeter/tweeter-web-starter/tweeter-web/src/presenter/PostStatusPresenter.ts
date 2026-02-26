import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model.service/StatusService";
import { MessageView, Presenter } from "./Presenter";

export interface PostStatusView extends MessageView {
  setIsLoading: (value: boolean) => void;
  clearPost: () => void;
}

export class PostStatusPresenter extends Presenter<PostStatusView> {
  private _service = new StatusService();

  public get service() {
    return this._service;
  }

  public constructor(view: PostStatusView) {
    super(view);
  }

  public checkButtonStatus(
    post: string,
    authToken: AuthToken | null,
    currentUser: User | null,
  ): boolean {
    return !post.trim() || !authToken || !currentUser;
  }

  public async postStatus(post: string, currentUser: User, authToken: AuthToken): Promise<void> {
    return this.submitPost(post, currentUser, authToken);
  }

  public async submitPost(post: string, currentUser: User, authToken: AuthToken): Promise<void> {
    let toastId = "";

    this.view.setIsLoading(true);

    try {
      toastId = this.view.displayInfoMessage("Posting status...", 0);

      await this.doFailureReportingOperation(async () => {
        const status = new Status(post, currentUser, Date.now());
        await this.service.postStatus(authToken, status);

        this.view.clearPost();
        this.view.displayInfoMessage("Status posted!", 2000);
      }, "post the status");
    } finally {
      if (toastId) this.view.deleteMessage(toastId);
      this.view.setIsLoading(false);
    }
  }
}
