import { blogsRepository } from "../repositories/blogs.repository";

// Маппер для очистки объекта от _id и лишних полей
const blogMapper = (blog: any) => ({
    id: blog.id,
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership
});

export const blogsHandlers = {
    async getAll(req: any, res: any) {
        const blogs = await blogsRepository.getAllBlogs();
        res.status(200).send(blogs.map(blogMapper));
    },

    async getOne(req: any, res: any) {
        const blog = await blogsRepository.findBlogById(req.params.id);
        if (!blog) {
            res.sendStatus(404);
            return;
        }
        res.status(200).send(blogMapper(blog));
    },

    async create(req: any, res: any) {
        const newBlog = await blogsRepository.createBlog(req.body);
        if (!newBlog) {
            res.sendStatus(500);
            return;
        }
        res.status(201).send(blogMapper(newBlog));
    },

    async update(req: any, res: any) {
        const isUpdated = await blogsRepository.updateBlog(req.params.id, req.body);
        if (isUpdated) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    },

    async delete(req: any, res: any) {
        const isDeleted = await blogsRepository.deleteBlog(req.params.id);
        if (isDeleted) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }
};