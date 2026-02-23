import { Request, Response, Router } from 'express';
import { blogCollection, postCollection } from '../db/mongo.db';
import { HttpStatus } from '../core/statuses';

export const testingRouter = Router();

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    try {
        await blogCollection.deleteMany({});
        await postCollection.deleteMany({});
        res.sendStatus(HttpStatus.NoContent);
    } catch (e) {
        res.sendStatus(HttpStatus.InternalServerError);
    }
});