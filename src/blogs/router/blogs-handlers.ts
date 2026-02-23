import { Request, Response } from 'express';
import {blogsRepository} from "../repositories/blogs.repository";
import { BlogInputModel } from '../schemas/blog-input-model';
import { BlogViewModel } from '../schemas/blog-view-model';
import { HttpStatus } from '../../core/statuses';

export const getBlogsHandler = async (req: Request, res: Response<BlogViewModel[]>) => {
    const blogs = await blogsRepository.getAll();
    res.status(HttpStatus.Ok).send(blogs);
};

export const getBlogByIdHandler = async (req: Request<{ id: string }>, res: Response<BlogViewModel>) => {
    const blog = await blogsRepository.getById(req.params.id);
    if (blog) {
        res.status(HttpStatus.Ok).send(blog);
    } else {
        res.sendStatus(HttpStatus.NotFound);
    }
};

export const createBlogHandler = async (req: Request<{}, {}, BlogInputModel>, res: Response<BlogViewModel>) => {
    const newBlog = await blogsRepository.createBlog(req.body);
    res.status(HttpStatus.Created).send(newBlog);
};

export const updateBlogHandler = async (req: Request<{ id: string }, {}, BlogInputModel>, res: Response) => {
    const isUpdated = await blogsRepository.updateBlog(req.params.id, req.body);
    if (isUpdated) {
        res.sendStatus(HttpStatus.NoContent);
    } else {
        res.sendStatus(HttpStatus.NotFound);
    }
};

export const deleteBlogHandler = async (req: Request<{ id: string }>, res: Response) => {
    const isDeleted = await blogsRepository.deleteBlog(req.params.id);
    if (isDeleted) {
        res.sendStatus(HttpStatus.NoContent);
    } else {
        res.sendStatus(HttpStatus.NotFound);
    }
};