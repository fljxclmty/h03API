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
exports.stopDB = exports.runDB = exports.postCollection = exports.blogCollection = exports.client = void 0;
const mongodb_1 = require("mongodb");
const settings_1 = require("../core/settings");
// --- 2. ПЕРЕМЕННЫЕ СОСТОЯНИЯ ---
const BLOG_COLLECTION_NAME = 'blogs';
const POST_COLLECTION_NAME = 'posts';
exports.client = null;
// --- 3. ФУНКЦИИ ПОДКЛЮЧЕНИЯ ---
/**
 * Инициализация подключения к БД
 * @param url - строка подключения (например, из .env)
 */
function runDB(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!url) {
            console.error('❌ Database URL is required');
            return false;
        }
        // Если клиент уже создан, не подключаемся заново
        if (exports.client)
            return true;
        exports.client = new mongodb_1.MongoClient(url);
        try {
            yield exports.client.connect();
            const db = exports.client.db(settings_1.SETTINGS.DB_NAME);
            // Проверка активности сервера
            yield db.command({ ping: 1 });
            // Инициализируем коллекции с типизацией
            exports.blogCollection = db.collection(BLOG_COLLECTION_NAME);
            exports.postCollection = db.collection(POST_COLLECTION_NAME);
            console.log('✅ Connected successfully to mongo server');
            return true;
        }
        catch (e) {
            console.error('❌ MongoDB connection error:', e);
            // В случае ошибки закрываем клиент и обнуляем его
            if (exports.client) {
                yield exports.client.close();
                exports.client = null;
            }
            return false;
        }
    });
}
exports.runDB = runDB;
/**
 * Закрытие соединения (нужно для тестов или остановки сервера)
 */
function stopDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (exports.client) {
            yield exports.client.close();
            exports.client = null;
            console.log('🔌 MongoDB connection closed');
        }
    });
}
exports.stopDB = stopDB;
