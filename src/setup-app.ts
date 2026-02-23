import express, { Express, Request, Response } from "express";
import { HttpStatus } from "./core/statuses";
import { BLOGS_PATH, POSTS_PATH, TESTING_PATH } from "./core/paths";
import { blogsRouter } from "./blogs/router/blogs-router";
import { postsRouter } from "./posts/router/posts-router";
import { testingRouter } from "./testing/testing-router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get("/", (req: Request, res: Response) => {
        res.status(HttpStatus.Ok).send('Hello World!');
    });

    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter);
    app.use(TESTING_PATH, testingRouter);

    return app;
}