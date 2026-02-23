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
exports.postsHandlers = void 0;
const posts_repository_1 = require("../repositories/posts-repository");
// Маппер для постов
const postMapper = (post) => ({
    id: post.id,
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt
});
exports.postsHandlers = {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield posts_repository_1.postsRepository.getAllPosts();
            res.status(200).send(posts.map(postMapper));
        });
    },
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield posts_repository_1.postsRepository.findPostById(req.params.id);
            if (!post) {
                res.sendStatus(404);
                return;
            }
            res.status(200).send(postMapper(post));
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = yield posts_repository_1.postsRepository.createPost(req.body);
            if (!newPost) {
                res.sendStatus(500);
                return;
            }
            res.status(201).send(postMapper(newPost));
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUpdated = yield posts_repository_1.postsRepository.updatePost(req.params.id, req.body);
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
            const isDeleted = yield posts_repository_1.postsRepository.deletePost(req.params.id);
            if (isDeleted) {
                res.sendStatus(204);
            }
            else {
                res.sendStatus(404);
            }
        });
    }
};
