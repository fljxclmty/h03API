import { Request, Response } from 'express';
import {postsRepository} from "../repositories/posts-repository";
import { HttpStatus } from '../../core/statuses';

export const postsHandlers = {
    async getAll(req: Request, res: Response) {
        const posts = await postsRepository.getAllPosts(); // Исправлено
        res.status(HttpStatus.OK).send(posts);
    },

    async getOne(req: Request, res: Response) {
        const post = await postsRepository.findPostById(req.params.id); // Исправлено
        if (!post) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        res.status(HttpStatus.OK).send(post);
    },

    async create(req: Request, res: Response) {
        const newPost = await postsRepository.createPost(req.body);
        if (!newPost) {
            res.sendStatus(HttpStatus.InternalServerError);
            return;
        }
        res.status(HttpStatus.Created).send(newPost);
    },

    async update(req: Request, res: Response) {
        // Передаем req.body как один объект
        const isUpdated = await postsRepository.updatePost(req.params.id, req.body);
        if (!isUpdated) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        res.sendStatus(HttpStatus.NoContent);
    },

    async delete(req: Request, res: Response) {
        const isDeleted = await postsRepository.deletePost(req.params.id);
        if (!isDeleted) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        res.sendStatus(HttpStatus.NoContent);
    }
};