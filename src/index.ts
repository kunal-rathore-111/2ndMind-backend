import 'dotenv/config';
import cors from 'cors';

// dependencies
import morgan from 'morgan';
import express from "express";
import cookieParser from 'cookie-parser';

// db connection
import { connectDB } from './config/dbConnection.js';
import { indexRoute } from './routes/indexRoutes.js';
import { any } from 'zod';

const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev'));
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(cookieParser());


connectDB();


app.use('/app/v1', indexRoute);

app.listen(PORT, () => { console.log(`Server started at ${PORT}`) })