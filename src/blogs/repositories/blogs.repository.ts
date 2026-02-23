import { getBlogCollection, BlogDBModel } from "../../db/mongo.db";
import { ObjectId } from 'mongodb';

export const blogsRepository = {
    async getAllBlogs(): Promise<BlogDBModel[]> {
        return await getBlogCollection().find({}).toArray();
    },

    async findBlogById(id: string): Promise<BlogDBModel | null> {
        return await getBlogCollection().findOne({ id });
    },

    async createBlog(data: { name: string, description: string, websiteUrl: string }): Promise<BlogDBModel | null> {
        const newBlog: BlogDBModel = {
            _id: new ObjectId(),
            id: Date.now().toString(),
            name: data.name,
            description: data.description,
            websiteUrl: data.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        };
        await getBlogCollection().insertOne(newBlog);
        return newBlog;
    },

    async updateBlog(id: string, data: { name: string, description: string, websiteUrl: string }): Promise<boolean> {
        const result = await getBlogCollection().updateOne(
            { id },
            { $set: { name: data.name, description: data.description, websiteUrl: data.websiteUrl } }
        );
        return result.matchedCount === 1;
    },

    async deleteBlog(id: string): Promise<boolean> {
        const result = await getBlogCollection().deleteOne({ id });
        return result.deletedCount === 1;
    }
};