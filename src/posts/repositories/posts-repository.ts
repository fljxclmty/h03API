import { postCollection, blogCollection, PostDBModel } from "../../db/mongo.db";
import { ObjectId } from 'mongodb';

export const postsRepository = {
    async getAllPosts(): Promise<PostDBModel[]> {
        if (!postCollection) return [];
        return await postCollection.find({}).toArray();
    },

    async findPostById(id: string): Promise<PostDBModel | null> {
        if (!postCollection) return null;
        return await postCollection.findOne({ id });
    },

    async createPost(data: { title: string, shortDescription: string, content: string, blogId: string }): Promise<PostDBModel | null> {
        if (!postCollection || !blogCollection) return null;

        // Обязательно ищем блог, чтобы получить blogName
        const blog = await blogCollection.findOne({ id: data.blogId });

        const newPost: PostDBModel = {
            _id: new ObjectId(),
            id: Date.now().toString(),
            title: data.title,
            shortDescription: data.shortDescription,
            content: data.content,
            blogId: data.blogId,
            blogName: blog ? blog.name : "Unknown Blog",
            createdAt: new Date().toISOString()
        };

        try {
            await postCollection.insertOne(newPost);
            return newPost;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    async updatePost(id: string, data: { title: string, shortDescription: string, content: string, blogId: string }): Promise<boolean> {
        if (!postCollection) return false;
        const result = await postCollection.updateOne(
            { id },
            {
                $set: {
                    title: data.title,
                    shortDescription: data.shortDescription,
                    content: data.content,
                    blogId: data.blogId
                }
            }
        );
        return result.matchedCount === 1;
    },

    async deletePost(id: string): Promise<boolean> {
        if (!postCollection) return false;
        const result = await postCollection.deleteOne({ id });
        return result.deletedCount === 1;
    }
};