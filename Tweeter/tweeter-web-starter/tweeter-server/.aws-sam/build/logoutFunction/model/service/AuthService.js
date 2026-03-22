"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tweeter_shared_1 = require("tweeter-shared");
const buffer_1 = require("buffer");
class AuthService {
    async login(alias, password) {
        const user = tweeter_shared_1.FakeData.instance.firstUser;
        if (user == null) {
            throw new Error("Invalid alias or password");
        }
        return [user.dto, tweeter_shared_1.FakeData.instance.authToken.token];
    }
    async register(firstName, lastName, alias, password, userImageBase64, imageFileExtension) {
        buffer_1.Buffer.from(userImageBase64, "base64");
        const user = tweeter_shared_1.FakeData.instance.firstUser;
        if (user == null) {
            throw new Error("Invalid registration");
        }
        return [user.dto, tweeter_shared_1.FakeData.instance.authToken.token];
    }
    async logout(token) {
        return;
    }
}
exports.AuthService = AuthService;
