import { FakeData, UserDto } from "tweeter-shared";
import { Buffer } from "buffer";

export class AuthService {
  public async login(alias: string, password: string): Promise<[UserDto, string]> {
    const user = FakeData.instance.firstUser;

    if (user == null) {
      throw new Error("Invalid alias or password");
    }

    return [user.dto, FakeData.instance.authToken.token];
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBase64: string,
    imageFileExtension: string,
  ): Promise<[UserDto, string]> {
    Buffer.from(userImageBase64, "base64");

    const user = FakeData.instance.firstUser;

    if (user == null) {
      throw new Error("Invalid registration");
    }

    return [user.dto, FakeData.instance.authToken.token];
  }

  public async logout(token: string): Promise<void> {
    return;
  }
}
