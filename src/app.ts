import express from 'express';
import { router } from './routes';
import { config } from 'dotenv';

config();

const app = express();
app.use(express.json());
app.use(router);
export { app };