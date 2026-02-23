import { blogCollection, BlogDBModel } from "../../db/mongo.db";
import { BlogInputModel } from "../schemas/blog-input-model";
import { BlogViewModel } from "../schemas/blog-view-model"; // Твой новый тип без _id
import { ObjectId, WithId } from "mongodb";

export const blogsRepository = {
    // МЕНЯЕМ ТИП ТУТ: Promise<BlogViewModel[]> вместо BlogDBModel[]
    async getAll(): Promise<BlogViewModel[]> {
        const blogs: WithId<BlogDBModel>[] = await blogCollection.find({}).toArray();
        return blogs.map(blog => this._mapBlog(blog));
    },

    // МЕНЯЕМ ТИП ТУТ: Promise<BlogViewModel | null>
    async getById(id: string): Promise<BlogViewModel | null> {
        const blog: WithId<BlogDBModel> | null = await blogCollection.findOne({ id: id });
        if (!blog) return null;
        return this._mapBlog(blog);
    },

    // При создании возвращаем тоже ViewModel, чтобы Swagger видел правильную структуру
    async createBlog(newBlog: BlogInputModel): Promise<BlogViewModel> {
        const lastBlog = await blogCollection.find().sort({ id: -1 }).limit(1).toArray();
        const nextId = lastBlog.length ? (+lastBlog[0].id + 1).toString() : "1";

        const blogToInsert: BlogDBModel = {
            _id: new ObjectId(),
            id: nextId,
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: new Date().toISOString(), // Добавлено согласно ТЗ
            isMembership: false // Добавлено согласно ТЗ
        };

        await blogCollection.insertOne(blogToInsert);
        return this._mapBlog(blogToInsert as WithId<BlogDBModel>);
    },

    async updateBlog(id: string, updateData: BlogInputModel): Promise<boolean> {
        const result = await blogCollection.updateOne(
            { id: id },
            { $set: {
                    name: updateData.name,
                    description: updateData.description,
                    websiteUrl: updateData.websiteUrl
                }}
        );
        return result.matchedCount === 1;
    },

    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogCollection.deleteOne({ id: id });
        return result.deletedCount === 1;
    },

    // ЭТОТ МЕТОД ТЕПЕРЬ ВОЗВРАЩАЕТ BlogViewModel
    _mapBlog(blog: WithId<BlogDBModel>): BlogViewModel {
        return {
            id: blog.id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        };
    }
};