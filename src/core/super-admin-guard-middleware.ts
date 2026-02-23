import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from "./statuses";

export const superAdminGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const auth = (req as any).headers['authorization'] as string;

    if (!auth || !auth.startsWith('Basic ')) {
        (res as any).sendStatus(HttpStatus.Unauthorized);
        return;
    }

    const token = auth.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if (username !== (process.env.ADMIN_USERNAME || 'admin') || password !== (process.env.ADMIN_PASSWORD || 'qwerty')) {
        (res as any).sendStatus(HttpStatus.Unauthorized);
        return;
    }

    (next as any)(); // Фикс для TS2349
};