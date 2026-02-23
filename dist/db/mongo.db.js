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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDb = exports.postCollection = exports.blogCollection = exports.client = void 0;
const mongodb_1 = require("mongodb");
const settings_1 = require("../core/settings");
exports.client = null;
function runDb(url) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🛠 Начало подключения к MongoDB..."); // Появится в логах Vercel
        if (exports.client)
            return true;
        exports.client = new mongodb_1.MongoClient(url, {
            serverSelectionTimeoutMS: 5000, // Ждем не более 5 секунд
            connectTimeoutMS: 5000,
        });
        try {
            console.log("📡 Отправка запроса в Atlas...");
            yield exports.client.connect();
            console.log("🗄 Выбор базы данных...");
            const db = exports.client.db(settings_1.SETTINGS.DB_NAME);
            exports.blogCollection = db.collection('blogs');
            exports.postCollection = db.collection('posts');
            console.log("✅ УСПЕХ: База подключена!");
            return true;
        }
        catch (e) {
            console.error("❌ КРИТИЧЕСКАЯ ОШИБКА:", e);
            return false;
        }
    });
}
exports.runDb = runDb;
