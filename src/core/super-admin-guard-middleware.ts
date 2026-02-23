import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from "./statuses";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'qwerty';

export const superAdminGuardMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    // Используем any для доступа к заголовкам
    const auth = (req as any).headers['authorization'] as string;

    if (!auth) {
        (res as any).sendStatus(HttpStatus.Unauthorized);
        return;
    }

    const [authType, token] = auth.split(' ');

    if (authType !== 'Basic' || !token) {
        (res as any).sendStatus(HttpStatus.Unauthorized);
        return;
    }

    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        (res as any).sendStatus(HttpStatus.Unauthorized);
        return;
    }

    // Силовой вызов следующего middleware
    (next as any)();
};