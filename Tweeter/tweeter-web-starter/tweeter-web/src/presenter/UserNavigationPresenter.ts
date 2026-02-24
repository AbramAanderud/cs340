import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model.service/UserService";
import { Presenter, View } from "./Presenter";

export interface UserNavigationView extends View {
  setDisplayedUser: (user: User) => void;
  navigate: (path: string) => void;
}

export class UserNavigationPresenter extends Presenter<UserNavigationView> {
  private userService = new UserService();

  public constructor(view: UserNavigationView) {
    super(view);
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
    await this.doFailureReportingOperation(async () => {
      const alias = this.extractAlias(rawAlias);

      const toUser = await this.userService.getUser(authToken, alias);

      if (toUser && !toUser.equals(displayedUser)) {
        this.view.setDisplayedUser(toUser);
        this.view.navigate(`${featurePath}/${toUser.alias}`);
      }
    }, "get user");
  }
}
