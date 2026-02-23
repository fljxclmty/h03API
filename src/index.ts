import express, { Express } from 'express';
import { setupApp } from './setup-app';
import { runDb } from "./db/mongo.db";

const app: Express = express();
setupApp(app);

const port = process.env.PORT || 3000;

// Извлекаем URL из переменных окружения
const mongoUri = process.env.MONGO_URL;

const startApp = async () => {
    // Проверка на наличие URL, чтобы избежать падения при запуске
    if (!mongoUri) {
        console.error("Error: MONGO_URL is not defined in environment variables");
        // На Vercel мы не выходим через exit, но логируем ошибку
        return;
    }

    // Передаем URL в функцию, как того требует её описание
    const connected = await runDb(mongoUri);

    if (connected) {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } else {
        console.error("Failed to connect to MongoDB");
    }
};

startApp();

// ОЧЕНЬ ВАЖНО: Экспорт для Vercel, чтобы не было ошибки "No exports found"
export default app;