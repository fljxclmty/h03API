import { MongoClient, Collection, ObjectId } from 'mongodb';
import { SETTINGS } from "../core/settings";

// Типы моделей
export type BlogDBModel = { _id: ObjectId; id: string; name: string; description: string; websiteUrl: string; createdAt: string; isMembership: boolean; }
export interface PostDBModel { _id: ObjectId; id: string; title: string; shortDescription: string; content: string; blogId: string; blogName: string; createdAt: string; }

export let client: MongoClient | null = null;
export let blogCollection: Collection<BlogDBModel>;
export let postCollection: Collection<PostDBModel>;

export async function runDb(url: string): Promise<boolean> {
    if (client) return true;

    client = new MongoClient(url, {
        serverSelectionTimeoutMS: 3000, // Ждем базу не дольше 3 сек
        connectTimeoutMS: 3000,
    });

    try {
        await client.connect();
        const db = client.db(SETTINGS.DB_NAME);

        // Инициализируем коллекции
        blogCollection = db.collection<BlogDBModel>('blogs');
        postCollection = db.collection<PostDBModel>('posts');

        console.log('✅ MongoDB Connected');
        return true;
    } catch (e) {
        console.error('❌ MongoDB Connection Error:', e);
        return false;
    }
}