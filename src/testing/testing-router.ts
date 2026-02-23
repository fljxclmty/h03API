import { Request, Response, Router } from 'express';
import { blogCollection, postCollection } from '../db/mongo.db';
import { HttpStatus } from '../core/statuses';

export const testingRouter = Router();

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    try {
        // Проверяем, инициализированы ли коллекции, чтобы избежать падения сервера
        if (blogCollection && postCollection) {
            await blogCollection.deleteMany({});
            await postCollection.deleteMany({});
        } else {
            // Если коллекции еще не созданы в БД, технически данных нет, поэтому тоже 204
            console.warn("Attempted to delete data, but collections are not initialized yet.");
        }

        // Используем приведение к any для обхода проблем с типами Express, как в твоем примере
        (res as any).sendStatus(HttpStatus.NoContent);
    } catch (e) {
        console.error("Error during data deletion:", e);
        (res as any).sendStatus(HttpStatus.InternalServerError);
    }
});