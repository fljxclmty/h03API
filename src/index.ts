import express, { Express } from 'express';
import { setupApp } from './setup-app';
import { runDb } from "./db/mongo.db";


const app: Express = express();
setupApp(app);

const startApp = async () => {

    await runDb();
};

startApp();

export default app;