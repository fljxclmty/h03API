import { Request, Response } from 'express';
import {postsRepository} from "../repositories/posts-repository";
import { PostInputModel } from '../schemas/post-input-model';
import { PostViewModel } from '../schemas/post-view-model';
import { HttpStatus } from '../../core/statuses';

// Мы создаем локальные псевдонимы типов, чтобы TypeScript точно знал структуру
type Res<T> = Response<T>;
type Req<P = {}, B = {}> = Request<P, {}, B>;

export const getPostsHandler = async (req: Request, res: Response) => {
    const posts = await postsRepository.getAll();
    res.status(HttpStatus.Ok).send(posts);
};

export const getPostByIdHandler = async (req: Request<{ id: string }>, res: Response) => {
    const post = await postsRepository.getById(req.params.id);
    if (post) {
        res.status(HttpStatus.Ok).send(post);
    } else {
        res.sendStatus(HttpStatus.NotFound);
    }
};

export const createPostHandler = async (req: Request<{}, {}, PostInputModel>, res: Response) => {
    const newPost = await postsRepository.createPost(req.body);
    if (newPost) {
        res.status(HttpStatus.Created).send(newPost);
    } else {
        res.sendStatus(HttpStatus.BadRequest);
    }
};

export const updatePostHandler = async (req: Request<{ id: string }, {}, PostInputModel>, res: Response) => {
    const isUpdated = await postsRepository.updatePost(req.params.id, req.body);
    if (isUpdated) {
        res.sendStatus(HttpStatus.NoContent);
    } else {
        res.sendStatus(HttpStatus.NotFound);
    }
};

export const deletePostHandler = async (req: Request<{ id: string }>, res: Response) => {
    const isDeleted = await postsRepository.deletePost(req.params.id);
    if (isDeleted) {
        res.sendStatus(HttpStatus.NoContent);
    } else {
        res.sendStatus(HttpStatus.NotFound);
    }
};