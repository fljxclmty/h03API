import { Collection, Db, MongoClient, ObjectId } from 'mongodb';
import { SETTINGS } from "../core/settings";

// --- 1. ТИПЫ ДАННЫХ (MODELS) ---
export type BlogDBModel = {
    _id: ObjectId
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt: string
    isMembership: boolean
}

export interface PostDBModel {
    _id: ObjectId;
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
}

// --- 2. ПЕРЕМЕННЫЕ СОСТОЯНИЯ ---
const BLOG_COLLECTION_NAME = 'blogs';
const POST_COLLECTION_NAME = 'posts';

export let client: MongoClient | null = null;
export let blogCollection: Collection<BlogDBModel>;
export let postCollection: Collection<PostDBModel>;

// --- 3. ФУНКЦИИ ПОДКЛЮЧЕНИЯ ---
export async function runDb(url: string): Promise<boolean> {
    if (!url) {
        console.error('❌ Database URL is required');
        return false;
    }

    if (client) return true;

    client = new MongoClient(url);

    try {
        await client.connect();
        // Используем DB_NAME из настроек или fallback на 'h03'
        const db: Db = client.db(SETTINGS.DB_NAME || 'h03');

        await db.command({ ping: 1 });

        blogCollection = db.collection<BlogDBModel>(BLOG_COLLECTION_NAME);
        postCollection = db.collection<PostDBModel>(POST_COLLECTION_NAME);

        console.log('✅ Connected successfully to MongoDB Atlas');
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

export async function stopDB(): Promise<void> {
    if (client) {
        await client.close();
        client = null;
        console.log('🔌 MongoDB connection closed');
    }
}