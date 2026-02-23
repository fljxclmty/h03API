import { MongoClient, Collection, ObjectId } from 'mongodb';
import { SETTINGS } from "../core/settings";

export type BlogDBModel = { _id: ObjectId; id: string; name: string; description: string; websiteUrl: string; createdAt: string; isMembership: boolean; }
export interface PostDBModel { _id: ObjectId; id: string; title: string; shortDescription: string; content: string; blogId: string; blogName: string; createdAt: string; }

export let client: MongoClient | null = null;
export let blogCollection: Collection<BlogDBModel>;
export let postCollection: Collection<PostDBModel>;

export async function runDb(url: string): Promise<boolean> {
    if (!url) {
        console.error("❌ MONGO_URL is missing!");
        return false;
    }

    client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(SETTINGS.DB_NAME || 'h03_database');

        blogCollection = db.collection<BlogDBModel>('blogs');
        postCollection = db.collection<PostDBModel>('posts');

        console.log("✅ Successfully connected to MongoDB");
        return true;
    } catch (e) {
        console.error("❌ MongoDB Connection Error:", e);
        await client.close();
        return false;
    }
}