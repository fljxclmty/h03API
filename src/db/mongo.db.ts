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
    isMembership: boolean // Добавляем это поле
}

export interface PostDBModel {
    _id: ObjectId;          // Внутренний ID MongoDB
    id: string;             // Наш строковый ID для Swagger
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

/**
 * Инициализация подключения к БД
 * @param url - строка подключения (например, из .env)
 */
export async function runDb(url: string): Promise<boolean> {
    if (!url) {
        console.error('❌ Database URL is required');
        return false;
    }

    // Если клиент уже создан, не подключаемся заново
    if (client) return true;

    client = new MongoClient(url);

    try {
        await client.connect();
        const db: Db = client.db(SETTINGS.DB_NAME);

        // Проверка активности сервера
        await db.command({ ping: 1 });

        // Инициализируем коллекции с типизацией
        blogCollection = db.collection<BlogDBModel>(BLOG_COLLECTION_NAME);
        postCollection = db.collection<PostDBModel>(POST_COLLECTION_NAME);

        console.log('✅ Connected successfully to mongo server');
        return true;
    } catch (e) {
        console.error('❌ MongoDB connection error:', e);
        // В случае ошибки закрываем клиент и обнуляем его
        if (client) {
            await client.close();
            client = null;
        }
        return false;
    }
}

/**
 * Закрытие соединения (нужно для тестов или остановки сервера)
 */
export async function stopDB(): Promise<void> {
    if (client) {
        await client.close();
        client = null;
        console.log('🔌 MongoDB connection closed');
    }
}