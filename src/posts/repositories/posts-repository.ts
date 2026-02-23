import { blogCollection, postCollection, PostDBModel } from "../../db/mongo.db";
import { PostInputModel } from "../schemas/post-input-model";
import { ObjectId, WithId } from "mongodb";

export const postsRepository = {

    async getAll(): Promise<WithId<PostDBModel>[]> {
        return postCollection.find().toArray();
    },

    async getById(id: string): Promise<WithId<PostDBModel> | null> {
        // Поиск по строковому id, как мы и договаривались
        return postCollection.findOne({ id: id });
    },

    async createPost(newPost: PostInputModel): Promise<PostDBModel | null> {
        const blog = await blogCollection.findOne({ id: newPost.blogId });

        // Проверка на null, чтобы не было ошибки TS18047
        if (!blog) return null;

        const lastPost = await postCollection.find().sort({id: -1}).limit(1).toArray();
        const nextId = lastPost.length ? (+lastPost[0].id + 1).toString() : "1";

        const postToInsert: PostDBModel = {
            _id: new ObjectId(),
            id: nextId,
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        };

        await postCollection.insertOne(postToInsert);
        return postToInsert;
    },

    async updatePost(id: string, updateData: PostInputModel): Promise<boolean> {
        try {
            // При обновлении поста также проверяем, существует ли новый blogId (если он изменился)
            const blog = await blogCollection.findOne({ id: updateData.blogId });
            if (!blog) return false;

            const result = await postCollection.updateOne(
                { id: id },
                {
                    $set: {
                        title: updateData.title,
                        shortDescription: updateData.shortDescription,
                        content: updateData.content,
                        blogId: updateData.blogId,
                        blogName: blog.name // Обновляем имя блога на случай, если пост перенесли в другой блог
                    }
                }
            );

            return result.matchedCount === 1;
        } catch (e) {
            console.error(e);
            return false;
        }
    },

    async deletePost(id: string): Promise<boolean> {
        try {
            const result = await postCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
};