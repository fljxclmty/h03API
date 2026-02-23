import express, {Express} from "express";
import {HttpStatus} from "./core/statuses";
import {BLOGS_PATH} from "./core/paths";
import {POSTS_PATH} from "./core/paths";
import {TESTING_PATH} from "./core/paths";
import {blogsRouter} from "./blogs/router/blogs-router";
import {postsRouter} from "./posts/router/posts-router";
import {testingRouter} from "./testing/testing-router";


export const setupApp = (app: Express)=> {

    app.use(express.json()) // middleware для парсинга json в тело запроса


    app.get("/", (req, res) => {

        res.status(HttpStatus.Ok).send('Hello World!')

    });

    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter);
    app.use(TESTING_PATH, testingRouter);





    return app;
}
