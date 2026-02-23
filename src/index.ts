import express from 'express';
import { setupApp } from './setup-app';
import { SETTINGS } from "./core/settings";
import { runDB } from './db/mongo.db';

const bootstrap = async () => {
    const app = express();
    setupApp(app);

    // 1. Сначала ждем подключения к базе
    const isConnected = await runDB(SETTINGS.MONGO_URL);

    if (!isConnected) {
        console.error("❌ Database connection failed. Exiting...");
        process.exit(1); // Завершаем процесс, если БД недоступна
    }

    // 2. Только потом запускаем сервер
    const PORT = SETTINGS.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
};

// Вызываем bootstrap и ловим возможные ошибки
bootstrap().catch(err => {
    console.error("💥 Bootstrap error:", err);
});