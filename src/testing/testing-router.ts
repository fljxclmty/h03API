import { Router, Request, Response } from 'express';
import { getBlogCollection, getPostCollection } from '../db/mongo.db';
import { HttpStatus } from '../core/statuses';

export const testingRouter = Router();

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    await getBlogCollection().deleteMany({});
    await getPostCollection().deleteMany({});
    res.sendStatus(HttpStatus.NoContent);
});