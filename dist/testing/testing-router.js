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
exports.testingRouter = void 0;
const express_1 = require("express");
const mongo_db_1 = require("../db/mongo.db");
const statuses_1 = require("../core/statuses");
exports.testingRouter = (0, express_1.Router)();
exports.testingRouter.delete('/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Проверяем, инициализированы ли коллекции, чтобы избежать падения сервера
        if (mongo_db_1.blogCollection && mongo_db_1.postCollection) {
            yield mongo_db_1.blogCollection.deleteMany({});
            yield mongo_db_1.postCollection.deleteMany({});
        }
        else {
            // Если коллекции еще не созданы в БД, технически данных нет, поэтому тоже 204
            console.warn("Attempted to delete data, but collections are not initialized yet.");
        }
        // Используем приведение к any для обхода проблем с типами Express, как в твоем примере
        res.sendStatus(statuses_1.HttpStatus.NoContent);
    }
    catch (e) {
        console.error("Error during data deletion:", e);
        res.sendStatus(statuses_1.HttpStatus.InternalServerError);
    }
}));
