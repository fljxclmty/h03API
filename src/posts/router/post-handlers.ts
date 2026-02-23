import {postsRepository} from "../repositories/posts-repository";
import { HttpStatus } from '../../core/statuses';

export const postsHandlers = {
    async getAll(req: any, res: any) {
        const posts = await postsRepository.getAllPosts();
        res.status(HttpStatus.OK).send(posts);
    },

    async getOne(req: any, res: any) {
        const post = await postsRepository.findPostById(req.params.id);
        if (!post) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        res.status(HttpStatus.OK).send(post);
    },

    async create(req: any, res: any) {
        const newPost = await postsRepository.createPost(req.body);
        if (!newPost) {
            res.sendStatus(HttpStatus.InternalServerError);
            return;
        }
        res.status(HttpStatus.Created).send(newPost);
    },

    async update(req: any, res: any) {
        const isUpdated = await postsRepository.updatePost(req.params.id, req.body);
        if (!isUpdated) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        res.sendStatus(HttpStatus.NoContent);
    },

    async delete(req: any, res: any) {
        const isDeleted = await postsRepository.deletePost(req.params.id);
        if (!isDeleted) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        res.sendStatus(HttpStatus.NoContent);
    }
};