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
const getPostsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield posts_repository_1.postsRepository.getAll();
    res.status(statuses_1.HttpStatus.Ok).send(posts);
});
exports.getPostsHandler = getPostsHandler;
const getPostByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield posts_repository_1.postsRepository.getById(req.params.id);
    if (post) {
        res.status(statuses_1.HttpStatus.Ok).send(post);
    }
    else {
        res.sendStatus(statuses_1.HttpStatus.NotFound);
    }
});
exports.getPostByIdHandler = getPostByIdHandler;
const createPostHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = yield posts_repository_1.postsRepository.createPost(req.body);
    if (newPost) {
        res.status(statuses_1.HttpStatus.Created).send(newPost);
    }
    else {
        res.sendStatus(statuses_1.HttpStatus.BadRequest);
    }
});
exports.createPostHandler = createPostHandler;
const updatePostHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield posts_repository_1.postsRepository.updatePost(req.params.id, req.body);
    if (isUpdated) {
        res.sendStatus(statuses_1.HttpStatus.NoContent);
    }
    else {
        res.sendStatus(statuses_1.HttpStatus.NotFound);
    }
});
exports.updatePostHandler = updatePostHandler;
const deletePostHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield posts_repository_1.postsRepository.deletePost(req.params.id);
    if (isDeleted) {
        res.sendStatus(statuses_1.HttpStatus.NoContent);
    }
    else {
        res.sendStatus(statuses_1.HttpStatus.NotFound);
    }
});
exports.deletePostHandler = deletePostHandler;
