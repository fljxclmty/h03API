import { postCollection, PostDBModel } from "../../db/mongo.db";

export const postsRepository = {
    async getAllPosts(): Promise<PostDBModel[]> {
        if (!postCollection) return [];
        return await postCollection.find({}).toArray();
    },

    async findPostById(id: string): Promise<PostDBModel | null> {
        if (!postCollection) return null;
        return await postCollection.findOne({ id });
    },

    async createPost(newPost: PostDBModel): Promise<PostDBModel | null> {
        if (!postCollection) return null;
        await postCollection.insertOne(newPost);
        return newPost;
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