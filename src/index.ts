import express, { Express } from 'express';
import { setupApp } from './setup-app';
import { runDb } from "./db/mongo.db";
import { SETTINGS } from "./core/settings";

const app: Express = express();
setupApp(app);

const startApp = async () => {
    const mongoUri = process.env.MONGO_URL || SETTINGS.MONGO_URL;
    await runDb(mongoUri);
};

startApp();

export default app;