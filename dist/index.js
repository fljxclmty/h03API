"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setup_app_1 = require("./setup-app");
const mongo_db_1 = require("./db/mongo.db");
const app = (0, express_1.default)();
(0, setup_app_1.setupApp)(app);
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URL; // Берется из настроек Vercel
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoUri) {
        console.error("❌ Error: MONGO_URL is not defined in environment variables");
        return;
    }
    // Передаем URL в runDb, исправляя ошибку TS2554
    const connected = yield (0, mongo_db_1.runDb)(mongoUri);
    if (connected) {
        // Приведение к any исправляет ошибку TS2339
        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    }
    else {
        console.error("❌ Failed to connect to MongoDB Atlas. Проверь IP 0.0.0.0/0");
    }
});
startApp();
// Обязательный экспорт для работы Serverless Functions на Vercel
exports.default = app;
