import { blogCollection, BlogDBModel } from "../../db/mongo.db";

export const blogsRepository = {
    async getAllBlogs(): Promise<BlogDBModel[]> {
        if (!blogCollection) return [];
        return await blogCollection.find({}).toArray();
    },

    async findBlogById(id: string): Promise<BlogDBModel | null> {
        if (!blogCollection) return null;
        return await blogCollection.findOne({ id });
    },

    async createBlog(newBlog: BlogDBModel): Promise<BlogDBModel | null> {
        if (!blogCollection) return null;
        await blogCollection.insertOne(newBlog);
        return newBlog;
    },

    async updateBlog(id: string, data: { name: string, description: string, websiteUrl: string }): Promise<boolean> {
        if (!blogCollection) return false;
        const result = await blogCollection.updateOne(
            { id },
            { $set: { name: data.name, description: data.description, websiteUrl: data.websiteUrl } }
        );
        return result.matchedCount === 1;
    },

    async deleteBlog(id: string): Promise<boolean> {
        if (!blogCollection) return false;
        const result = await blogCollection.deleteOne({ id });
        return result.deletedCount === 1;
    }
};