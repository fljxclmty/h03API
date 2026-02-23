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
        if (!url) {
            console.error("❌ MONGO_URL is missing!");
            return false;
        }
        exports.client = new mongodb_1.MongoClient(url);
        try {
            yield exports.client.connect();
            const db = exports.client.db(settings_1.SETTINGS.DB_NAME || 'h03_database');
            exports.blogCollection = db.collection('blogs');
            exports.postCollection = db.collection('posts');
            console.log("✅ Successfully connected to MongoDB");
            return true;
        }
        catch (e) {
            console.error("❌ MongoDB Connection Error:", e);
            yield exports.client.close();
            return false;
        }
    });
}
exports.runDb = runDb;
