import { Request, Response } from 'express';
import {postsRepository} from "../repositories/posts-repository";
import { PostInputModel } from '../schemas/post-input-model';

import { HttpStatus } from '../../core/statuses';

export const getPostsHandler = async (req: Request, res: Response) => {
    const posts = await postsRepository.getAll();
    (res as any).status(HttpStatus.Ok).send(posts);
};

export const getPostByIdHandler = async (req: Request<{ id: string }>, res: Response) => {
    const post = await postsRepository.getById((req as any).params.id);
    if (post) {
        (res as any).status(HttpStatus.Ok).send(post);
    } else {
        (res as any).sendStatus(HttpStatus.NotFound);
    }
};

export const createPostHandler = async (req: Request<{}, {}, PostInputModel>, res: Response) => {
    const newPost = await postsRepository.createPost((req as any).body);
    if (newPost) {
        (res as any).status(HttpStatus.Created).send(newPost);
    } else {
        (res as any).sendStatus(HttpStatus.BadRequest);
    }
};

export const updatePostHandler = async (req: Request<{ id: string }, {}, PostInputModel>, res: Response) => {
    const isUpdated = await postsRepository.updatePost((req as any).params.id, (req as any).body);
    if (isUpdated) {
        (res as any).sendStatus(HttpStatus.NoContent);
    } else {
        (res as any).sendStatus(HttpStatus.NotFound);
    }
};

export const deletePostHandler = async (req: Request<{ id: string }>, res: Response) => {
    const isDeleted = await postsRepository.deletePost((req as any).params.id);
    if (isDeleted) {
        (res as any).sendStatus(HttpStatus.NoContent);
    } else {
        (res as any).sendStatus(HttpStatus.NotFound);
    }
};