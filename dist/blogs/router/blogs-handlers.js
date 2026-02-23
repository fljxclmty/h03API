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
const statuses_1 = require("../../core/statuses");
exports.blogsHandlers = {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield blogs_repository_1.blogsRepository.getAllBlogs();
            res.status(statuses_1.HttpStatus.OK).send(blogs);
        });
    },
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogs_repository_1.blogsRepository.findBlogById(req.params.id);
            if (!blog) {
                res.sendStatus(statuses_1.HttpStatus.NotFound);
                return;
            }
            res.status(statuses_1.HttpStatus.OK).send(blog);
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = yield blogs_repository_1.blogsRepository.createBlog(req.body);
            if (!newBlog) {
                res.sendStatus(statuses_1.HttpStatus.InternalServerError);
                return;
            }
            res.status(statuses_1.HttpStatus.Created).send(newBlog);
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUpdated = yield blogs_repository_1.blogsRepository.updateBlog(req.params.id, req.body);
            if (!isUpdated) {
                res.sendStatus(statuses_1.HttpStatus.NotFound);
                return;
            }
            res.sendStatus(statuses_1.HttpStatus.NoContent);
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield blogs_repository_1.blogsRepository.deleteBlog(req.params.id);
            if (!isDeleted) {
                res.sendStatus(statuses_1.HttpStatus.NotFound);
                return;
            }
            res.sendStatus(statuses_1.HttpStatus.NoContent);
        });
    }
};
