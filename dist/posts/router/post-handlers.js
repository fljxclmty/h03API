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
exports.deletePostHandler = exports.updatePostHandler = exports.createPostHandler = exports.getPostByIdHandler = exports.getPostsHandler = void 0;
const posts_repository_1 = require("../repositories/posts-repository");
const statuses_1 = require("../../core/statuses");
// 1. Получение всех постов
function getPostsHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const posts = yield posts_repository_1.postsRepository.getAll();
            res.status(statuses_1.HttpStatus.Ok).send(posts);
        }
        catch (e) {
            console.error(e);
            res.status(statuses_1.HttpStatus.InternalServerError).send({ message: "Internal server error" });
        }
    });
}
exports.getPostsHandler = getPostsHandler;
// 2. Получение поста по ID
function getPostByIdHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield posts_repository_1.postsRepository.getById(req.params.id);
            if (post) {
                res.status(statuses_1.HttpStatus.Ok).send(post);
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
exports.getPostByIdHandler = getPostByIdHandler;
// 3. Создание поста
function createPostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newPostData = req.body;
            const createdPost = yield posts_repository_1.postsRepository.createPost(newPostData);
            if (createdPost) {
                // Если пост создан успешно (блог найден и ID сгенерирован)
                res.status(statuses_1.HttpStatus.Created).send(createdPost);
            }
            else {
                // Если postsRepository вернул null (например, указанный blogId не существует)
                res.status(statuses_1.HttpStatus.BadRequest).send({
                    errorsMessages: [
                        { message: "Blog with specified blogId not found", field: "blogId" }
                    ]
                });
            }
        }
        catch (e) {
            console.error(e);
            res.status(statuses_1.HttpStatus.InternalServerError).send({ message: "Internal server error" });
        }
    });
}
exports.createPostHandler = createPostHandler;
// 4. Обновление поста
function updatePostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const updateData = req.body;
            const isUpdated = yield posts_repository_1.postsRepository.updatePost(id, updateData);
            if (isUpdated) {
                res.sendStatus(statuses_1.HttpStatus.NoContent);
            }
            else {
                // Либо пост не найден, либо передан несуществующий blogId
                res.sendStatus(statuses_1.HttpStatus.NotFound);
            }
        }
        catch (e) {
            console.error(e);
            res.status(statuses_1.HttpStatus.InternalServerError).send({ message: "Internal server error" });
        }
    });
}
exports.updatePostHandler = updatePostHandler;
// 5. Удаление поста
function deletePostHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isDeleted = yield posts_repository_1.postsRepository.deletePost(req.params.id);
            if (isDeleted) {
                res.sendStatus(statuses_1.HttpStatus.NoContent);
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
exports.deletePostHandler = deletePostHandler;
