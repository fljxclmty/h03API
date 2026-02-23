import { MongoClient, Collection, ObjectId } from 'mongodb';
import { SETTINGS } from "../core/settings";

// Типы моделей
export type BlogDBModel = { _id: ObjectId; id: string; name: string; description: string; websiteUrl: string; createdAt: string; isMembership: boolean; }
export interface PostDBModel { _id: ObjectId; id: string; title: string; shortDescription: string; content: string; blogId: string; blogName: string; createdAt: string; }

export let client: MongoClient | null = null;
export let blogCollection: Collection<BlogDBModel>;
export let postCollection: Collection<PostDBModel>;

export async function runDb(url: string): Promise<boolean> {
    console.log("🛠 Начало подключения к MongoDB..."); // Появится в логах Vercel
    if (client) return true;

    client = new MongoClient(url, {
        serverSelectionTimeoutMS: 5000, // Ждем не более 5 секунд
        connectTimeoutMS: 5000,
    });

    try {
        console.log("📡 Отправка запроса в Atlas...");
        await client.connect();

        console.log("🗄 Выбор базы данных...");
        const db = client.db(SETTINGS.DB_NAME);

        blogCollection = db.collection<BlogDBModel>('blogs');
        postCollection = db.collection<PostDBModel>('posts');

        console.log("✅ УСПЕХ: База подключена!");
        return true;
    } catch (e) {
        console.error("❌ КРИТИЧЕСКАЯ ОШИБКА:", e);
        return false;
    }
}