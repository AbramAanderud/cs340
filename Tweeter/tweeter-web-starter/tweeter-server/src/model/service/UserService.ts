import { FakeData, UserDto } from "tweeter-shared";

export class UserService {
  public async getUser(token: string, alias: string): Promise<UserDto | null> {
    const user = FakeData.instance.findUserByAlias(alias);
    return user ? user.dto : null;
  }
}
