"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AuthService_1 = require("../../model/service/AuthService");
const handler = async (request) => {
    const authService = new AuthService_1.AuthService();
    const [user, authToken] = await authService.login(request.alias, request.password);
    return {
        success: true,
        message: null,
        user,
        authToken,
    };
};
exports.handler = handler;
