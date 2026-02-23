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
exports.deleteBlogHandler = exports.updateBlogHandler = exports.createBlogHandler = exports.getBlogByIdHandler = exports.getBlogsHandler = void 0;
const blogs_repository_1 = require("../repositories/blogs.repository");
const statuses_1 = require("../../core/statuses"); // enum
// 1. Получение всех блогов
function getBlogsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const blogs = yield blogs_repository_1.blogsRepository.getAll();
            res.status(statuses_1.HttpStatus.Ok).send(blogs);
        }
        catch (e) {
            console.error(e);
            res.status(statuses_1.HttpStatus.InternalServerError).send({ message: "Internal server error" });
        }
    });
}
exports.getBlogsHandler = getBlogsHandler;
// 2. Получение одного блога по ID
function getBlogByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const blog = yield blogs_repository_1.blogsRepository.getById(req.params.id);
            if (blog) {
                res.status(statuses_1.HttpStatus.Ok).send(blog);
            }
            else {
                res.sendStatus(statuses_1.HttpStatus.NotFound);
            }
        }
        catch (e) {
            console.error(e);
            res.status(statuses_1.HttpStatus.InternalServerError).send({ message: "Internal server error" });
        }
    });
}
exports.getBlogByIdHandler = getBlogByIdHandler;
// 3. Создание блога
function createBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newBlogData = req.body;
            const createdBlog = yield blogs_repository_1.blogsRepository.createBlog(newBlogData);
            // Возвращаем созданный объект и статус 201
            res.status(statuses_1.HttpStatus.Created).send(createdBlog);
        }
        catch (e) {
            console.error(e);
            res.status(statuses_1.HttpStatus.InternalServerError).send({ message: "Internal server error" });
        }
    });
}
exports.createBlogHandler = createBlogHandler;
// 4. Обновление блога
function updateBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const isUpdated = yield blogs_repository_1.blogsRepository.updateBlog(id, updateData);
            if (isUpdated) {
                res.sendStatus(statuses_1.HttpStatus.NoContent); // 204
            }
            else {
                res.sendStatus(statuses_1.HttpStatus.NotFound); // 404
            }
        }
        catch (e) {
            console.error(e);
            res.status(statuses_1.HttpStatus.InternalServerError).send({ message: "Internal server error" });
        }
    });
}
exports.updateBlogHandler = updateBlogHandler;
// 5. Удаление блога
function deleteBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isDeleted = yield blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
            if (isDeleted) {
                res.sendStatus(statuses_1.HttpStatus.NoContent); // 204
            }
            else {
                res.sendStatus(statuses_1.HttpStatus.NotFound); // 404
            }
        }
        catch (e) {
            console.error(e);
            res.status(statuses_1.HttpStatus.InternalServerError).send({ message: "Internal server error" });
        }
    });
}
exports.deleteBlogHandler = deleteBlogHandler;
