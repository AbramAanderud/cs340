import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/UserService";

export interface UserNavigationView {
  setDisplayedUser: (user: User) => void;
  navigate: (path: string) => void;
  displayErrorMessage: (message: string) => void;
}

export class UserNavigationPresenter {
  private userService: UserService;

  public constructor(private view: UserNavigationView) {
    this.userService = new UserService();
  }

  private extractAlias(value: string): string {
    const at = value.indexOf("@");
    return at >= 0 ? value.substring(at) : value;
  }

  public async navigateToAlias(
    authToken: AuthToken,
    displayedUser: User,
    featurePath: string,
    rawAlias: string,
  ): Promise<void> {
    try {
      const alias = this.extractAlias(rawAlias);

      const toUser = await this.userService.getUser(authToken, alias);

      if (toUser && !toUser.equals(displayedUser)) {
        this.view.setDisplayedUser(toUser);
        this.view.navigate(`${featurePath}/${toUser.alias}`);
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to get user because of exception: ${error}`,
      );
    }
  }
}
