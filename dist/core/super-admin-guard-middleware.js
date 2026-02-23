"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminGuardMiddleware = exports.ADMIN_PASSWORD = exports.ADMIN_USERNAME = void 0;
const statuses_1 = require("./statuses");
// Берем из env или используем дефолты
exports.ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
exports.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'qwerty';
const superAdminGuardMiddleware = (req, res, next) => {
    // Приводим к any, чтобы избежать ошибок 'Property headers/sendStatus does not exist' на Vercel
    const request = req;
    const response = res;
    const auth = request.headers['authorization'];
    if (!auth) {
        response.sendStatus(statuses_1.HttpStatus.Unauthorized);
        return;
    }
    const [authType, token] = auth.split(' ');
    if (authType !== 'Basic' || !token) {
        response.sendStatus(statuses_1.HttpStatus.Unauthorized);
        return;
    }
    // Декодируем base64
    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    if (username !== exports.ADMIN_USERNAME || password !== exports.ADMIN_PASSWORD) {
        response.sendStatus(statuses_1.HttpStatus.Unauthorized);
        return;
    }
    // Вызываем next как функцию. Тип NextFunction из express 4.x это позволяет.
    next();
};
exports.superAdminGuardMiddleware = superAdminGuardMiddleware;
