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
        // Если клиент уже есть, не переподключаемся
        if (exports.client)
            return true;
        // Создаем клиента с четкими таймаутами для тестов
        exports.client = new mongodb_1.MongoClient(url, {
            serverSelectionTimeoutMS: 4000,
            connectTimeoutMS: 4000,
        });
        try {
            yield exports.client.connect();
            // ЖЕСТКО берем имя из настроек, игнорируя хвост в MONGO_URL
            const db = exports.client.db(settings_1.SETTINGS.DB_NAME);
            exports.blogCollection = db.collection('blogs');
            exports.postCollection = db.collection('posts');
            // Простая проверка связи
            yield db.command({ ping: 1 });
            console.log(`✅ Connected to DB: ${settings_1.SETTINGS.DB_NAME}`);
            return true;
        }
        catch (e) {
            console.error('❌ MongoDB connection failed:', e);
            if (exports.client) {
                yield exports.client.close();
                exports.client = null;
            }
            return false;
        }
    });
}
exports.runDb = runDb;
