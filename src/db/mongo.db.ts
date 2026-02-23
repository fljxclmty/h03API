import { MongoClient, Collection, ObjectId } from 'mongodb';
import { SETTINGS } from "../core/settings";

// Типы моделей
export type BlogDBModel = { _id: ObjectId; id: string; name: string; description: string; websiteUrl: string; createdAt: string; isMembership: boolean; }
export interface PostDBModel { _id: ObjectId; id: string; title: string; shortDescription: string; content: string; blogId: string; blogName: string; createdAt: string; }

export let client: MongoClient | null = null;
export let blogCollection: Collection<BlogDBModel>;
export let postCollection: Collection<PostDBModel>;

export async function runDb(url: string): Promise<boolean> {
    // Если клиент уже есть, не переподключаемся
    if (client) return true;

    // Создаем клиента с четкими таймаутами для тестов
    client = new MongoClient(url, {
        serverSelectionTimeoutMS: 4000,
        connectTimeoutMS: 4000,
    });

    try {
        await client.connect();

        // ЖЕСТКО берем имя из настроек, игнорируя хвост в MONGO_URL
        const db = client.db(SETTINGS.DB_NAME);

        blogCollection = db.collection<BlogDBModel>('blogs');
        postCollection = db.collection<PostDBModel>('posts');

        // Простая проверка связи
        await db.command({ ping: 1 });
        console.log(`✅ Connected to DB: ${SETTINGS.DB_NAME}`);
        return true;
    } catch (e) {
        console.error('❌ MongoDB connection failed:', e);
        if (client) {
            await client.close();
            client = null;
        }
        return false;
    }
}