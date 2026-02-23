"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminGuardMiddleware = void 0;
const statuses_1 = require("./statuses");
const superAdminGuardMiddleware = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth || !auth.startsWith('Basic ')) {
        res.sendStatus(statuses_1.HttpStatus.Unauthorized);
        return;
    }
    const token = auth.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    if (username !== (process.env.ADMIN_USERNAME || 'admin') || password !== (process.env.ADMIN_PASSWORD || 'qwerty')) {
        res.sendStatus(statuses_1.HttpStatus.Unauthorized);
        return;
    }
    next(); // Фикс для TS2349
};
exports.superAdminGuardMiddleware = superAdminGuardMiddleware;
