import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from "./statuses";

// Берем из env или используем дефолты
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'qwerty';

export const superAdminGuardMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // Приводим к any, чтобы избежать ошибок 'Property headers/sendStatus does not exist' на Vercel
    const request = req as any;
    const response = res as any;

    const auth = request.headers['authorization'] as string;

    if (!auth) {
        response.sendStatus(HttpStatus.Unauthorized);
        return;
    }

    const [authType, token] = auth.split(' ');

    if (authType !== 'Basic' || !token) {
        response.sendStatus(HttpStatus.Unauthorized);
        return;
    }

    // Декодируем base64
    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        response.sendStatus(HttpStatus.Unauthorized);
        return;
    }

    // Вызываем next как функцию. Тип NextFunction из express 4.x это позволяет.
    next();
};