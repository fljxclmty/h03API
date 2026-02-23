import express, { Express } from 'express';
import { setupApp } from './setup-app';
import { runDb } from "./db/mongo.db";

const app: Express = express();
setupApp(app);

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URL;

const startApp = async () => {
    if (!mongoUri) {
        console.error("❌ Error: MONGO_URL is not defined in environment variables");
        return;
    }

    // Передаем URL из process.env в функцию инициализации
    const connected = await runDb(mongoUri);

    if (connected) {
        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    } else {
        console.error("❌ Failed to connect to MongoDB. Check your IP Whitelist (0.0.0.0/0)");
    }
};

startApp();

// Обязательный экспорт для работы Vercel Serverless Functions
export default app;