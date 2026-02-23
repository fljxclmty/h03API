import express, { Express } from 'express';
import { setupApp } from './setup-app';
import { runDb } from "./db/mongo.db";

const app: Express = express();
setupApp(app);

const port = process.env.PORT || 3000;
// Берем URL из переменных окружения
const mongoUri = process.env.MONGO_URL;

const startApp = async () => {
    if (!mongoUri) {
        console.error("Error: MONGO_URL is not defined in env variables");
        process.exit(1);
    }

    // Передаем URL в функцию подключения
    const connected = await runDb(mongoUri);

    if (connected) {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    }
};

startApp();

// ОБЯЗАТЕЛЬНО для Vercel
export default app;