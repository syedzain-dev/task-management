import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
const app = express();
import userRouter from './routers/userRouter.js';

dotenv.config({ path: './config/.env' });

import bodyParser from 'body-parser'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/users', userRouter);




export default app;