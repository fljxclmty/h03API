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
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    // Берем URL из переменных Vercel или из конфига
    const mongoUri = process.env.MONGO_URL || settings_1.SETTINGS.MONGO_URL;
    // Пытаемся подключиться к БД
    yield (0, mongo_db_1.runDb)(mongoUri);
    // Слушаем порт только локально (Vercel сам управляет портом)
    if (process.env.NODE_ENV !== 'production') {
        app.listen(settings_1.SETTINGS.PORT, () => {
            console.log(`🚀 Local server started on port ${settings_1.SETTINGS.PORT}`);
        });
    }
});
startApp();
// ЭТО САМОЕ ВАЖНОЕ: Vercel ищет этот экспорт!
exports.default = app;
