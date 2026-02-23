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
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.postCollection.find().toArray();
        });
    },
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Поиск по строковому id, как мы и договаривались
            return mongo_db_1.postCollection.findOne({ id: id });
        });
    },
    createPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield mongo_db_1.blogCollection.findOne({ id: newPost.blogId });
            // Проверка на null, чтобы не было ошибки TS18047
            if (!blog)
                return null;
            const lastPost = yield mongo_db_1.postCollection.find().sort({ id: -1 }).limit(1).toArray();
            const nextId = lastPost.length ? (+lastPost[0].id + 1).toString() : "1";
            const postToInsert = {
                _id: new mongodb_1.ObjectId(),
                id: nextId,
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId,
                blogName: blog.name,
                createdAt: new Date().toISOString()
            };
            yield mongo_db_1.postCollection.insertOne(postToInsert);
            return postToInsert;
        });
    },
    updatePost(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // При обновлении поста также проверяем, существует ли новый blogId (если он изменился)
                const blog = yield mongo_db_1.blogCollection.findOne({ id: updateData.blogId });
                if (!blog)
                    return false;
                const result = yield mongo_db_1.postCollection.updateOne({ id: id }, {
                    $set: {
                        title: updateData.title,
                        shortDescription: updateData.shortDescription,
                        content: updateData.content,
                        blogId: updateData.blogId,
                        blogName: blog.name // Обновляем имя блога на случай, если пост перенесли в другой блог
                    }
                });
                return result.matchedCount === 1;
            }
            catch (e) {
                console.error(e);
                return false;
            }
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield mongo_db_1.postCollection.deleteOne({ id: id });
                return result.deletedCount === 1;
            }
            catch (e) {
                console.error(e);
                return false;
            }
        });
    }
};
