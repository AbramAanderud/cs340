import { RegisterRequest, AuthResponse } from "tweeter-shared";
import { AuthService } from "../../model/service/AuthService";

export const handler = async (request: RegisterRequest): Promise<AuthResponse> => {
  const authService = new AuthService();
  const [user, authToken] = await authService.register(
    request.firstName,
    request.lastName,
    request.alias,
    request.password,
    request.userImageBase64,
    request.imageFileExtension,
  );

  return {
    success: true,
    message: null,
    user,
    authToken,
  };
};
