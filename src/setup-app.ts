import express, { Express, Request, Response } from "express";
import { HttpStatus } from "./core/statuses";
import { BLOGS_PATH, POSTS_PATH, TESTING_PATH } from "./core/paths";
import { blogsRouter } from "./blogs/router/blogs-router";
import { postsRouter } from "./posts/router/posts-router";
import { testingRouter } from "./testing/testing-router";

export const setupApp = (app: Express) => {
    // Используем приведение к any, чтобы Vercel не ругался на отсутствие методов
    const server = app as any;

    server.use(express.json());

    server.get("/", (req: Request, res: Response) => {
        res.status(HttpStatus.Ok).send('Hello World!');
    });

    server.use(BLOGS_PATH, blogsRouter);
    server.use(POSTS_PATH, postsRouter);
    server.use(TESTING_PATH, testingRouter);

    return app;
}