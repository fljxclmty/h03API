import { Router } from 'express';
import { getBlogCollection, getPostCollection } from '../db/mongo.db';
import { HttpStatus } from '../core/statuses';

export const testingRouter = Router();

// Добавляем any, чтобы TS не ругался на sendStatus
testingRouter.delete('/all-data', async (req: any, res: any) => {
    try {
        await getBlogCollection().deleteMany({});
        await getPostCollection().deleteMany({});
        res.sendStatus(HttpStatus.NoContent);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});