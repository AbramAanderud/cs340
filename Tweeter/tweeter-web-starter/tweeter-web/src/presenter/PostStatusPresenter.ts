import { AuthToken, Status, User } from "tweeter-shared";
import { StatusService } from "../model.service/StatusService";

export interface PostStatusView {
  setIsLoading: (value: boolean) => void;
  clearPost: () => void;

  displayErrorMessage: (message: string) => void;
  displayInfoMessage: (message: string, duration: number) => string;
  deleteMessage: (id: string) => void;
}

export class PostStatusPresenter {
  private statusService: StatusService;

  public constructor(private view: PostStatusView) {
    this.statusService = new StatusService();
  }

  public checkButtonStatus(
    post: string,
    authToken: AuthToken | null,
    currentUser: User | null,
  ): boolean {
    return !post.trim() || !authToken || !currentUser;
  }

  public async submitPost(
    post: string,
    currentUser: User,
    authToken: AuthToken,
  ): Promise<void> {
    let toastId = "";

    try {
      this.view.setIsLoading(true);
      toastId = this.view.displayInfoMessage("Posting status...", 0);

      const status = new Status(post, currentUser, Date.now());
      await this.statusService.postStatus(authToken, status);

      this.view.clearPost();
      this.view.displayInfoMessage("Status posted!", 2000);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to post the status because of exception: ${error}`,
      );
    } finally {
      if (toastId) this.view.deleteMessage(toastId);
      this.view.setIsLoading(false);
    }
  }
}
