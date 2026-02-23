"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminGuardMiddleware = exports.ADMIN_PASSWORD = exports.ADMIN_USERNAME = void 0;
const statuses_1 = require("./statuses");
// Process - это глобальный объект в Node.js, который предоставляет информацию о текущем процессе Node.js
// env — это объект, который хранит все переменные окружения текущего процесса. Переменные окружения — это значения,
// которые могут быть установлены на уровне операционной системы или приложения и которые могут использоваться для
// настройки поведения программного обеспечения (например, пароли, ключи API, пути к файлам и т. д.)
exports.ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
exports.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'qwerty';
const superAdminGuardMiddleware = (req, res, next) => {
    const auth = req.headers['authorization']; // 'Basic xxxx'
    if (!auth) {
        res.sendStatus(statuses_1.HttpStatus.Unauthorized);
        return;
    }
    const [authType, token] = auth.split(' ');
    if (authType !== 'Basic') {
        res.sendStatus(statuses_1.HttpStatus.Unauthorized);
        return;
    }
    const credentials = Buffer.from(token, 'base64').toString('utf-8'); //dbcadkcnasdk
    const [username, password] = credentials.split(':'); //admin:qwerty
    if (username !== exports.ADMIN_USERNAME || password !== exports.ADMIN_PASSWORD) {
        res.sendStatus(statuses_1.HttpStatus.Unauthorized);
        return;
    }
    next(); // Успешная авторизация, продолжаем
};
exports.superAdminGuardMiddleware = superAdminGuardMiddleware;
