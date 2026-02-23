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
        if (exports.client)
            return true;
        exports.client = new mongodb_1.MongoClient(url, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000,
        });
        try {
            console.log("📡 Attempting Atlas connection...");
            yield exports.client.connect();
            const db = exports.client.db(settings_1.SETTINGS.DB_NAME);
            exports.blogCollection = db.collection('blogs');
            exports.postCollection = db.collection('posts');
            console.log("✅ MongoDB Connected successfully");
            return true;
        }
        catch (e) {
            console.error("❌ MongoDB connection failed:", e);
            if (exports.client)
                yield exports.client.close();
            exports.client = null;
            return false;
        }
    });
}
exports.runDb = runDb;
