import { Collection, Db, MongoClient, ObjectId } from 'mongodb';
import { SETTINGS } from "../core/settings";

export type BlogDBModel = {
    _id: ObjectId; id: string; name: string; description: string;
    websiteUrl: string; createdAt: string; isMembership: boolean;
}

export interface PostDBModel {
    _id: ObjectId; id: string; title: string; shortDescription: string;
    content: string; blogId: string; blogName: string; createdAt: string;
}

export let client: MongoClient | null = null;
export let blogCollection: Collection<BlogDBModel>;
export let postCollection: Collection<PostDBModel>;

export async function runDb(url: string): Promise<boolean> {
    if (client) return true;

    // Используем настройки таймаута, чтобы сервер не "висел"
    client = new MongoClient(url, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
    });

    try {
        await client.connect();
        const db: Db = client.db(SETTINGS.DB_NAME);

        // Инициализируем коллекции СРАЗУ
        blogCollection = db.collection<BlogDBModel>('blogs');
        postCollection = db.collection<PostDBModel>('posts');

        console.log('✅ Connected to MongoDB Atlas');
        return true;
    } catch (e) {
        console.error('❌ MongoDB connection error:', e);
        if (client) {
            await client.close();
            client = null;
        }
        return false;
    }
}