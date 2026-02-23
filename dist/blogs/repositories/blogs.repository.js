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
    // МЕНЯЕМ ТИП ТУТ: Promise<BlogViewModel[]> вместо BlogDBModel[]
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield mongo_db_1.blogCollection.find({}).toArray();
            return blogs.map(blog => this._mapBlog(blog));
        });
    },
    // МЕНЯЕМ ТИП ТУТ: Promise<BlogViewModel | null>
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield mongo_db_1.blogCollection.findOne({ id: id });
            if (!blog)
                return null;
            return this._mapBlog(blog);
        });
    },
    // При создании возвращаем тоже ViewModel, чтобы Swagger видел правильную структуру
    createBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastBlog = yield mongo_db_1.blogCollection.find().sort({ id: -1 }).limit(1).toArray();
            const nextId = lastBlog.length ? (+lastBlog[0].id + 1).toString() : "1";
            const blogToInsert = {
                _id: new mongodb_1.ObjectId(),
                id: nextId,
                name: newBlog.name,
                description: newBlog.description,
                websiteUrl: newBlog.websiteUrl,
                createdAt: new Date().toISOString(), // Добавлено согласно ТЗ
                isMembership: false // Добавлено согласно ТЗ
            };
            yield mongo_db_1.blogCollection.insertOne(blogToInsert);
            return this._mapBlog(blogToInsert);
        });
    },
    updateBlog(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.blogCollection.updateOne({ id: id }, { $set: {
                    name: updateData.name,
                    description: updateData.description,
                    websiteUrl: updateData.websiteUrl
                } });
            return result.matchedCount === 1;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.blogCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    // ЭТОТ МЕТОД ТЕПЕРЬ ВОЗВРАЩАЕТ BlogViewModel
    _mapBlog(blog) {
        return {
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        };
    }
};
