import { Request, Response } from 'express';
import {blogsRepository} from "../repositories/blogs.repository";
import { BlogInputModel } from '../schemas/blog-input-model';

import { HttpStatus } from '../../core/statuses';

export const getBlogsHandler = async (req: Request, res: Response) => {
    const blogs = await blogsRepository.getAll();
    (res as any).status(HttpStatus.Ok).send(blogs);
};

export const getBlogByIdHandler = async (req: Request<{ id: string }>, res: Response) => {
    const blog = await blogsRepository.getById((req as any).params.id);
    if (blog) {
        (res as any).status(HttpStatus.Ok).send(blog);
    } else {
        (res as any).sendStatus(HttpStatus.NotFound);
    }
};

export const createBlogHandler = async (req: Request<{}, {}, BlogInputModel>, res: Response) => {
    const newBlog = await blogsRepository.createBlog((req as any).body);
    (res as any).status(HttpStatus.Created).send(newBlog);
};

export const updateBlogHandler = async (req: Request<{ id: string }, {}, BlogInputModel>, res: Response) => {
    const isUpdated = await blogsRepository.updateBlog((req as any).params.id, (req as any).body);
    if (isUpdated) {
        (res as any).sendStatus(HttpStatus.NoContent);
    } else {
        (res as any).sendStatus(HttpStatus.NotFound);
    }
};

export const deleteBlogHandler = async (req: Request<{ id: string }>, res: Response) => {
    const isDeleted = await blogsRepository.deleteBlog((req as any).params.id);
    if (isDeleted) {
        (res as any).sendStatus(HttpStatus.NoContent);
    } else {
        (res as any).sendStatus(HttpStatus.NotFound);
    }
};