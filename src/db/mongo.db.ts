import { MongoClient, Collection, ObjectId } from 'mongodb';
import { SETTINGS } from "../core/settings";

export type BlogDBModel = { _id: ObjectId; id: string; name: string; description: string; websiteUrl: string; createdAt: string; isMembership: boolean; }
export interface PostDBModel { _id: ObjectId; id: string; title: string; shortDescription: string; content: string; blogId: string; blogName: string; createdAt: string; }

export let client: MongoClient | null = null;
export let blogCollection: Collection<BlogDBModel>;
export let postCollection: Collection<PostDBModel>;

export async function runDb(url: string): Promise<boolean> {
    if (client) return true;

    client = new MongoClient(url, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
    });

    try {
        console.log("📡 Attempting Atlas connection...");
        await client.connect();
        const db = client.db(SETTINGS.DB_NAME);

        blogCollection = db.collection<BlogDBModel>('blogs');
        postCollection = db.collection<PostDBModel>('posts');

        console.log("✅ MongoDB Connected successfully");
        return true;
    } catch (e) {
        console.error("❌ MongoDB connection failed:", e);
        if (client) await client.close();
        client = null;
        return false;
    }
}