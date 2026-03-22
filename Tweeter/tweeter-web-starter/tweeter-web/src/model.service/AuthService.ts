import { AuthToken, LoginRequest, RegisterRequest, User } from "tweeter-shared";
import { Buffer } from "buffer";
import { ServerFacade } from "../network/ServerFacade";
import { Service } from "./Service";

export class AuthService implements Service {
  private serverFacade = new ServerFacade();

  public async login(alias: string, password: string): Promise<[User, AuthToken]> {
    const request: LoginRequest = {
      alias,
      password,
    };

    const [user, token] = await this.serverFacade.login(request);
    return [user, new AuthToken(token, Date.now())];
  }

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string,
  ): Promise<[User, AuthToken]> {
    const imageStringBase64: string = Buffer.from(userImageBytes).toString("base64");

    const request: RegisterRequest = {
      firstName,
      lastName,
      alias,
      password,
      userImageBase64: imageStringBase64,
      imageFileExtension,
    };

    const [user, token] = await this.serverFacade.register(request);
    return [user, new AuthToken(token, Date.now())];
  }

  public async logout(authToken: AuthToken): Promise<void> {
    await this.serverFacade.logout({
      token: authToken.token,
    });
  }
}
