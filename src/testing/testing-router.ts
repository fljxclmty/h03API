import { Router, Request, Response } from "express";
import {blogCollection, postCollection} from "../db/mongo.db";
import {HttpStatus} from "../core/statuses";

export const testingRouter = Router({});

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    try {
        // Очищаем обе коллекции одновременно
        await Promise.all([
            blogCollection.deleteMany({}),
            postCollection.deleteMany({})
        ]);

        // Возвращаем 204 No Content, как того требует спецификация
        res.sendStatus(HttpStatus.NoContent);
    } catch (e) {
        console.error("Failed to clear database:", e);
        res.sendStatus(HttpStatus.InternalServerError);
    }
});