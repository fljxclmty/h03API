import { blogCollection, BlogDBModel } from "../../db/mongo.db";
import { ObjectId } from 'mongodb';

export const blogsRepository = {
    async getAllBlogs(): Promise<BlogDBModel[]> {
        if (!blogCollection) return [];
        // Мапим, чтобы скрыть _id из ответа, если это нужно для тестов
        return await blogCollection.find({}).toArray();
    },

    async findBlogById(id: string): Promise<BlogDBModel | null> {
        if (!blogCollection) return null;
        return await blogCollection.findOne({ id });
    },

    async createBlog(data: { name: string, description: string, websiteUrl: string }): Promise<BlogDBModel | null> {
        if (!blogCollection) return null;

        const newBlog: BlogDBModel = {
            _id: new ObjectId(),
            id: Date.now().toString(),
            name: data.name,
            description: data.description,
            websiteUrl: data.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        };

        try {
            await blogCollection.insertOne(newBlog);
            return newBlog;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    async updateBlog(id: string, data: { name: string, description: string, websiteUrl: string }): Promise<boolean> {
        if (!blogCollection) return false;
        const result = await blogCollection.updateOne(
            { id },
            {
                $set: {
                    name: data.name,
                    description: data.description,
                    websiteUrl: data.websiteUrl
                }
            }
        );
        return result.matchedCount === 1;
    },

    async deleteBlog(id: string): Promise<boolean> {
        if (!blogCollection) return false;
        const result = await blogCollection.deleteOne({ id });
        return result.deletedCount === 1;
    }
};