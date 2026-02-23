import { Request, Response } from "express";
import { postsRepository } from "../repositories/posts-repository";
import {HttpStatus} from "../../core/statuses";
import {PostInputModel} from "../schemas/post-input-model";




// 1. Получение всех постов


export async function getPostsHandler(req: Request, res: Response) {
    try {
        const posts = await postsRepository.getAll();
        res.status(HttpStatus.Ok).send(posts);
    } catch (e) {
        console.error(e);
        res.status(HttpStatus.InternalServerError).send({ message: "Internal server error" });
    }
}

// 2. Получение поста по ID
export async function getPostByIdHandler(req: Request, res: Response) {
    try {
        const post = await postsRepository.getById(req.params.id);

        if (post) {
            res.status(HttpStatus.Ok).send(post);
        } else {
            res.sendStatus(HttpStatus.NotFound);
        }
    } catch (e) {
        console.error(e);
        res.status(HttpStatus.InternalServerError).send({ message: "Internal server error" });
    }
}

// 3. Создание поста
export async function createPostHandler(req: Request, res: Response) {
    try {
        const newPostData: PostInputModel = req.body;
        const createdPost = await postsRepository.createPost(newPostData);

        if (createdPost) {
            // Если пост создан успешно (блог найден и ID сгенерирован)
            res.status(HttpStatus.Created).send(createdPost);
        } else {
            // Если postsRepository вернул null (например, указанный blogId не существует)
            res.status(HttpStatus.BadRequest).send({
                errorsMessages: [
                    { message: "Blog with specified blogId not found", field: "blogId" }
                ]
            });
        }
    } catch (e) {
        console.error(e);
        res.status(HttpStatus.InternalServerError).send({ message: "Internal server error" });
    }
}

// 4. Обновление поста
export async function updatePostHandler(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const updateData: PostInputModel = req.body;

        const isUpdated = await postsRepository.updatePost(id, updateData);

        if (isUpdated) {
            res.sendStatus(HttpStatus.NoContent);
        } else {
            // Либо пост не найден, либо передан несуществующий blogId
            res.sendStatus(HttpStatus.NotFound);
        }
    } catch (e) {
        console.error(e);
        res.status(HttpStatus.InternalServerError).send({ message: "Internal server error" });
    }
}

// 5. Удаление поста
export async function deletePostHandler(req: Request, res: Response) {
    try {
        const isDeleted = await postsRepository.deletePost(req.params.id);

        if (isDeleted) {
            res.sendStatus(HttpStatus.NoContent);
        } else {
            res.sendStatus(HttpStatus.NotFound);
        }
    } catch (e) {
        console.error(e);
        res.status(HttpStatus.InternalServerError).send({ message: "Internal server error" });
    }
}