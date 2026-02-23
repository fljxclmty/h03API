import { getPostCollection, getBlogCollection, PostDBModel } from "../../db/mongo.db";
import { ObjectId } from 'mongodb';

export const postsRepository = {
    async getAllPosts(): Promise<PostDBModel[]> {
        return await getPostCollection().find({}).toArray();
    },

    async findPostById(id: string): Promise<PostDBModel | null> {
        return await getPostCollection().findOne({ id });
    },

    async createPost(data: { title: string, shortDescription: string, content: string, blogId: string }): Promise<PostDBModel | null> {
        const blog = await getBlogCollection().findOne({ id: data.blogId });

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

        await getPostCollection().insertOne(newPost);
        return newPost;
    },

    async updatePost(id: string, data: any): Promise<boolean> {
        const result = await getPostCollection().updateOne(
            { id },
            { $set: { ...data } }
        );
        return result.matchedCount === 1;
    },

    async deletePost(id: string): Promise<boolean> {
        const result = await getPostCollection().deleteOne({ id });
        return result.deletedCount === 1;
    }
};