import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
// dependencies
import morgan from 'morgan';
import express from "express";
import cookieParser from 'cookie-parser';

// db connection
import { connectDB } from './config/dbConnection.js';
import { indexRoute } from './routes/indexRoutes.js';
import AppError from './middlewares/appError.js';

const app = express();
const PORT = process.env.PORT;


app.use(helmet());
app.use(morgan('dev'));

const origins = [process.env.Frontend_URL, 'http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // allow for postman and mobileapps
        if (origins.includes(origin)) return callback(null, true);
        else return callback(new AppError('Invalid Origin', 500, 'CorsError')); // if any other origin return with error
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
    maxAge: 24 * 60 * 60, // 24 hours browser keep cache
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(cookieParser());


connectDB();


app.use('/app/v1', indexRoute);

app.listen(PORT, () => { console.log(`Server started at ${PORT}`) })