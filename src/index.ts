import express, { Express } from 'express';
import { setupApp } from './setup-app';
import { runDb } from "./db/mongo.db";
import { SETTINGS } from "./core/settings";

const app: Express = express();
setupApp(app);

const startApp = async () => {
    // Берем URL из переменных Vercel или из конфига
    const mongoUri = process.env.MONGO_URL || SETTINGS.MONGO_URL;

    // Пытаемся подключиться к БД
    await runDb(mongoUri);

    // Слушаем порт только локально (Vercel сам управляет портом)
    if (process.env.NODE_ENV !== 'production') {
        (app as any).listen(SETTINGS.PORT, () => {
            console.log(`🚀 Local server started on port ${SETTINGS.PORT}`);
        });
    }
};

startApp();

// ЭТО САМОЕ ВАЖНОЕ: Vercel ищет этот экспорт!
export default app;