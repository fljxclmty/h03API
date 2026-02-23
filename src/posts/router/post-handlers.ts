import { postsRepository } from "../repositories/posts-repository";

// Маппер для постов
const postMapper = (post: any) => ({
    id: post.id,
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt
});

export const postsHandlers = {
    async getAll(req: any, res: any) {
        const posts = await postsRepository.getAllPosts();
        res.status(200).send(posts.map(postMapper));
    },

    async getOne(req: any, res: any) {
        const post = await postsRepository.findPostById(req.params.id);
        if (!post) {
            res.sendStatus(404);
            return;
        }
        res.status(200).send(postMapper(post));
    },

    async create(req: any, res: any) {
        const newPost = await postsRepository.createPost(req.body);
        if (!newPost) {
            res.sendStatus(500);
            return;
        }
        res.status(201).send(postMapper(newPost));
    },

    async update(req: any, res: any) {
        const isUpdated = await postsRepository.updatePost(req.params.id, req.body);
        if (isUpdated) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    },

    async delete(req: any, res: any) {
        const isDeleted = await postsRepository.deletePost(req.params.id);
        if (isDeleted) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    }
};