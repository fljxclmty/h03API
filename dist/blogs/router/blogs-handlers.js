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
exports.blogsHandlers = void 0;
const blogs_repository_1 = require("../repositories/blogs.repository");
// Маппер для очистки объекта от _id и лишних полей
const blogMapper = (blog) => ({
    id: blog.id,
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership
});
exports.blogsHandlers = {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield blogs_repository_1.blogsRepository.getAllBlogs();
            res.status(200).send(blogs.map(blogMapper));
        });
    },
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogs_repository_1.blogsRepository.findBlogById(req.params.id);
            if (!blog) {
                res.sendStatus(404);
                return;
            }
            res.status(200).send(blogMapper(blog));
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = yield blogs_repository_1.blogsRepository.createBlog(req.body);
            if (!newBlog) {
                res.sendStatus(500);
                return;
            }
            res.status(201).send(blogMapper(newBlog));
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUpdated = yield blogs_repository_1.blogsRepository.updateBlog(req.params.id, req.body);
            if (isUpdated) {
                res.sendStatus(204);
            }
            else {
                res.sendStatus(404);
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
            if (isDeleted) {
                res.sendStatus(204);
            }
            else {
                res.sendStatus(404);
            }
        });
    }
};
