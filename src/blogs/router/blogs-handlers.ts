import { blogsRepository } from '../repositories/blogs.repository';
import { HttpStatus } from '../../core/statuses';

export const blogsHandlers = {
    async getAll(req: any, res: any) {
        const blogs = await blogsRepository.getAllBlogs();
        res.status(HttpStatus.OK).send(blogs);
    },

    async getOne(req: any, res: any) {
        const blog = await blogsRepository.findBlogById(req.params.id);
        if (!blog) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        res.status(HttpStatus.OK).send(blog);
    },

    async create(req: any, res: any) {
        const newBlog = await blogsRepository.createBlog(req.body);
        if (!newBlog) {
            res.sendStatus(HttpStatus.InternalServerError);
            return;
        }
        res.status(HttpStatus.Created).send(newBlog);
    },

    async update(req: any, res: any) {
        const isUpdated = await blogsRepository.updateBlog(req.params.id, req.body);
        if (!isUpdated) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        res.sendStatus(HttpStatus.NoContent);
    },

    async delete(req: any, res: any) {
        const isDeleted = await blogsRepository.deleteBlog(req.params.id);
        if (!isDeleted) {
            res.sendStatus(HttpStatus.NotFound);
            return;
        }
        res.sendStatus(HttpStatus.NoContent);
    }
};