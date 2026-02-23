import express, { Express } from 'express';
import { setupApp } from './setup-app';
import { runDb } from "./db/mongo.db";

const app: Express = express();
setupApp(app);

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URL; // Берется из настроек Vercel

const startApp = async () => {
    if (!mongoUri) {
        console.error("❌ Error: MONGO_URL is not defined in environment variables");
        return;
    }

    // Передаем URL в runDb, исправляя ошибку TS2554
    const connected = await runDb(mongoUri);

    if (connected) {
        // Приведение к any исправляет ошибку TS2339
        (app as any).listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    } else {
        console.error("❌ Failed to connect to MongoDB Atlas. Проверь IP 0.0.0.0/0");
    }
};

startApp();

// Обязательный экспорт для работы Serverless Functions на Vercel
export default app;