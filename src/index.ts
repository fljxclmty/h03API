import express, { Express } from 'express';
import { setupApp } from './setup-app';
import { runDb } from "./db/mongo.db";
import { SETTINGS } from "./core/settings";

const app: Express = express();
setupApp(app);

const mongoUri = process.env.MONGO_URL || SETTINGS.MONGO_URL;

const startApp = async () => {
    // Запускаем подключение к БД
    await runDb(mongoUri);

    // Слушаем порт только если мы не на Vercel (для локальных тестов)
    if (process.env.NODE_ENV !== 'production') {
        app.listen(SETTINGS.PORT, () => {
            console.log(`Local server started on port ${SETTINGS.PORT}`);
        });
    }
};

startApp();

// Vercel будет использовать этот экспорт напрямую
export default app;