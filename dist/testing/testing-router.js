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
// Добавляем any, чтобы TS не ругался на sendStatus
exports.testingRouter.delete('/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongo_db_1.getBlogCollection)().deleteMany({});
        yield (0, mongo_db_1.getPostCollection)().deleteMany({});
        res.sendStatus(statuses_1.HttpStatus.NoContent);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}));
