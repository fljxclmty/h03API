"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const statuses_1 = require("./core/statuses");
const paths_1 = require("./core/paths");
const blogs_router_1 = require("./blogs/router/blogs-router");
const posts_router_1 = require("./posts/router/posts-router");
const testing_router_1 = require("./testing/testing-router");
const setupApp = (app) => {
    const server = app;
    server.use(express_1.default.json());
    server.get("/", (req, res) => {
        res.status(statuses_1.HttpStatus.OK).send('Hello World!');
    });
    server.use(paths_1.BLOGS_PATH, blogs_router_1.blogsRouter);
    server.use(paths_1.POSTS_PATH, posts_router_1.postsRouter);
    server.use(paths_1.TESTING_PATH, testing_router_1.testingRouter);
    return app;
};
exports.setupApp = setupApp;
