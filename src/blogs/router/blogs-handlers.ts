import { Request, Response } from 'express';
import { blogsRepository } from '../repositories/blogs.repository';
import { HttpStatus } from '../../core/statuses';

export const blogsHandlers = {
    async getAll(req: Request, res: Response): Promise<void> {
        const blogs = await blogsRepository.getAllBlogs();
        res.status(HttpStatus.OK).send(blogs);
    },

    async getOne(req: Request, res: Response): Promise<void> {
        const blog = await blogsRepository.findBlogById(req.params.id);
        if (!blog) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        res.status(HttpStatus.OK).send(blog);
    },

    async create(req: Request, res: Response): Promise<void> {
        const newBlog = await blogsRepository.createBlog(req.body);
        if (!newBlog) {
            res.sendStatus(HttpStatus.InternalServerError);
            return;
        }
        res.status(HttpStatus.Created).send(newBlog);
    },

    async update(req: Request, res: Response): Promise<void> {
        const isUpdated = await blogsRepository.updateBlog(req.params.id, req.body);
        if (!isUpdated) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        res.sendStatus(HttpStatus.NoContent);
    },

    async delete(req: Request, res: Response): Promise<void> {
        const isDeleted = await blogsRepository.deleteBlog(req.params.id);
        if (!isDeleted) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        res.sendStatus(HttpStatus.NoContent);
    }
};