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
exports.blogsRepository = void 0;
const mongo_db_1 = require("../../db/mongo.db");
const mongodb_1 = require("mongodb");
exports.blogsRepository = {
    getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongo_db_1.blogCollection)
                return [];
            // Мапим, чтобы скрыть _id из ответа, если это нужно для тестов
            return yield mongo_db_1.blogCollection.find({}).toArray();
        });
    },
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongo_db_1.blogCollection)
                return null;
            return yield mongo_db_1.blogCollection.findOne({ id });
        });
    },
    createBlog(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongo_db_1.blogCollection)
                return null;
            const newBlog = {
                _id: new mongodb_1.ObjectId(),
                id: Date.now().toString(),
                name: data.name,
                description: data.description,
                websiteUrl: data.websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            try {
                yield mongo_db_1.blogCollection.insertOne(newBlog);
                return newBlog;
            }
            catch (e) {
                console.error(e);
                return null;
            }
        });
    },
    updateBlog(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongo_db_1.blogCollection)
                return false;
            const result = yield mongo_db_1.blogCollection.updateOne({ id }, {
                $set: {
                    name: data.name,
                    description: data.description,
                    websiteUrl: data.websiteUrl
                }
            });
            return result.matchedCount === 1;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongo_db_1.blogCollection)
                return false;
            const result = yield mongo_db_1.blogCollection.deleteOne({ id });
            return result.deletedCount === 1;
        });
    }
};
