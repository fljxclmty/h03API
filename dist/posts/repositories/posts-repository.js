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
exports.postsRepository = void 0;
const mongo_db_1 = require("../../db/mongo.db");
const mongodb_1 = require("mongodb");
exports.postsRepository = {
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongo_db_1.postCollection)
                return [];
            return yield mongo_db_1.postCollection.find({}).toArray();
        });
    },
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongo_db_1.postCollection)
                return null;
            return yield mongo_db_1.postCollection.findOne({ id });
        });
    },
    createPost(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongo_db_1.postCollection || !mongo_db_1.blogCollection)
                return null;
            // Обязательно ищем блог, чтобы получить blogName
            const blog = yield mongo_db_1.blogCollection.findOne({ id: data.blogId });
            const newPost = {
                _id: new mongodb_1.ObjectId(),
                id: Date.now().toString(),
                title: data.title,
                shortDescription: data.shortDescription,
                content: data.content,
                blogId: data.blogId,
                blogName: blog ? blog.name : "Unknown Blog",
                createdAt: new Date().toISOString()
            };
            try {
                yield mongo_db_1.postCollection.insertOne(newPost);
                return newPost;
            }
            catch (e) {
                console.error(e);
                return null;
            }
        });
    },
    updatePost(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongo_db_1.postCollection)
                return false;
            const result = yield mongo_db_1.postCollection.updateOne({ id }, {
                $set: {
                    title: data.title,
                    shortDescription: data.shortDescription,
                    content: data.content,
                    blogId: data.blogId
                }
            });
            return result.matchedCount === 1;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongo_db_1.postCollection)
                return false;
            const result = yield mongo_db_1.postCollection.deleteOne({ id });
            return result.deletedCount === 1;
        });
    }
};
