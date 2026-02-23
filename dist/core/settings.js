"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SETTINGS = void 0;
exports.SETTINGS = {
    // Vercel сам назначит PORT, поэтому приоритет отдаем переменной окружения
    PORT: process.env.PORT || 5003,
    // В Vercel будет использоваться значение из настроек проекта,
    // а локально — твоя строка (но лучше и локально использовать .env файл)
    MONGO_URL: process.env.MONGO_URL || 'mongodb+srv://fljx:DMtDKmIa9Flan8h5@cluster0.kkaodex.mongodb.net/home-task-db?retryWrites=true&w=majority&appName=Cluster0',
    // Убедись, что имя базы совпадает с тем, что ты используешь в коде
    DB_NAME: process.env.DB_NAME || 'h03_database',
};
