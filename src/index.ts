import express, { Express } from 'express';
import { setupApp } from './setup-app';
import { runDb } from "./db/mongo.db";
import { SETTINGS } from "./core/settings";

const app: Express = express();
setupApp(app);

const mongoUri = process.env.MONGO_URL || SETTINGS.MONGO_URL;

const startApp = async () => {
    // Сначала запускаем БД. Если она упадет, мы поймаем ошибку, но сервер должен жить
    try {
        await runDb(mongoUri);
    } catch (e) {
        console.error("🔴 DB Init Error:", e);
    }

    // Фикс TS2339: кастуем к any для вызова listen
    (app as any).listen(SETTINGS.PORT, () => {
        console.log(`🚀 Server started on port ${SETTINGS.PORT}`);
    });
};

startApp();

// Обязательный экспорт для Vercel
export default app;