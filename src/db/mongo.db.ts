import { MongoClient, Collection, ObjectId } from 'mongodb';
import { SETTINGS } from "../core/settings";

export type BlogDBModel = { _id: ObjectId; id: string; name: string; description: string; websiteUrl: string; createdAt: string; isMembership: boolean; }
export interface PostDBModel { _id: ObjectId; id: string; title: string; shortDescription: string; content: string; blogId: string; blogName: string; createdAt: string; }

const client = new MongoClient(process.env.MONGO_URL || SETTINGS.MONGO_URL || '');

export async function runDb() {
    try {
        await client.connect();
        console.log("✅ Connected to Mongo");
        return true;
    } catch (e) {
        console.error("❌ Mongo connection error", e);
        await client.close();
        return false;
    }
}

// Геттеры для коллекций (безопасный доступ)
export const getBlogCollection = () => client.db(SETTINGS.DB_NAME || 'h03_database').collection<BlogDBModel>('blogs');
export const getPostCollection = () => client.db(SETTINGS.DB_NAME || 'h03_database').collection<PostDBModel>('posts');