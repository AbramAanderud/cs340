import { AuthToken, GetUserRequest, User } from "tweeter-shared";
import { ServerFacade } from "../network/ServerFacade";
import { Service } from "./Service";

export class UserService implements Service {
  private serverFacade = new ServerFacade();

  public async getUser(authToken: AuthToken, alias: string): Promise<User | null> {
    const request: GetUserRequest = {
      token: authToken.token,
      alias,
    };

    return this.serverFacade.getUser(request);
  }
}
