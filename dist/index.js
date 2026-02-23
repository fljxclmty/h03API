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
const settings_1 = require("./core/settings");
const app = (0, express_1.default)();
(0, setup_app_1.setupApp)(app);
const mongoUri = process.env.MONGO_URL || settings_1.SETTINGS.MONGO_URL;
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    // Сначала запускаем БД. Если она упадет, мы поймаем ошибку, но сервер должен жить
    try {
        yield (0, mongo_db_1.runDb)(mongoUri);
    }
    catch (e) {
        console.error("🔴 DB Init Error:", e);
    }
    // Фикс TS2339: кастуем к any для вызова listen
    app.listen(settings_1.SETTINGS.PORT, () => {
        console.log(`🚀 Server started on port ${settings_1.SETTINGS.PORT}`);
    });
});
startApp();
// Обязательный экспорт для Vercel
exports.default = app;
