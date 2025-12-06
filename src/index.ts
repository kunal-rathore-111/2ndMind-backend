import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
// dependencies
import morgan from 'morgan';
import express from "express";
import cookieParser from 'cookie-parser';

import AppError from './middlewares/appError.js';

import { requestIdMiddleware } from './middlewares/requestIdMiddleware.js';

import { indexRoute } from './routes/indexRoutes.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { globalLimiter } from './utils/limiter.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;


app.use(helmet());
app.use(morgan('dev'));


//app.use(globalLimiter);


const origins = [process.env.Frontend_URL, 'http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // allow for postman and mobileapps
        if (origins.includes(origin)) return callback(null, true);
        else return callback(new AppError('Invalid Origin', 500, 'CorsError')); // if any other origin return with error
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    maxAge: 24 * 60 * 60, // 24 hours browser keep cache
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(cookieParser());




app.use('/app/v1', requestIdMiddleware, indexRoute);

app.use(errorMiddleware);

app.listen(PORT, () => { console.log(`Server started at ${PORT}`) })