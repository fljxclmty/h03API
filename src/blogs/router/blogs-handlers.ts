import { Request, Response } from "express";
import {blogsRepository} from "../repositories/blogs.repository";
import {HttpStatus} from "../../core/statuses"; // enum
import { BlogInputModel } from "../schemas/blog-input-model";

// 1. Получение всех блогов
export async function getBlogsHandler(req: Request, res: Response) {
    try {
        const blogs = await blogsRepository.getAll();
        res.status(HttpStatus.Ok).send(blogs);
    } catch (e) {
        console.error(e);
        res.status(HttpStatus.InternalServerError).send({ message: "Internal server error" });
    }
}

// 2. Получение одного блога по ID
export async function getBlogByIdHandler(req: Request, res: Response) {
    try {
        const blog = await blogsRepository.getById(req.params.id);

        if (blog) {
            res.status(HttpStatus.Ok).send(blog);
        } else {
            res.sendStatus(HttpStatus.NotFound);
        }
    } catch (e) {
        console.error(e);
        res.status(HttpStatus.InternalServerError).send({ message: "Internal server error" });
    }
}

// 3. Создание блога
export async function createBlogHandler(req: Request, res: Response) {
    try {
        const newBlogData: BlogInputModel = req.body;
        const createdBlog = await blogsRepository.createBlog(newBlogData);

        // Возвращаем созданный объект и статус 201
        res.status(HttpStatus.Created).send(createdBlog);
    } catch (e) {
        console.error(e);
        res.status(HttpStatus.InternalServerError).send({ message: "Internal server error" });
    }
}

// 4. Обновление блога
export async function updateBlogHandler(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const updateData: BlogInputModel = req.body;

        const isUpdated = await blogsRepository.updateBlog(id, updateData);

        if (isUpdated) {
            res.sendStatus(HttpStatus.NoContent); // 204
        } else {
            res.sendStatus(HttpStatus.NotFound); // 404
        }
    } catch (e) {
        console.error(e);
        res.status(HttpStatus.InternalServerError).send({ message: "Internal server error" });
    }
}

// 5. Удаление блога
export async function deleteBlogHandler(req: Request, res: Response) {
    try {
        const isDeleted = await blogsRepository.deleteBlog(req.params.id);

        if (isDeleted) {
            res.sendStatus(HttpStatus.NoContent); // 204
        } else {
            res.sendStatus(HttpStatus.NotFound); // 404
        }
    } catch (e) {
        console.error(e);
        res.status(HttpStatus.InternalServerError).send({ message: "Internal server error" });
    }
}