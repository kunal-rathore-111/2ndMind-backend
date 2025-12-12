import postgres from "postgres";
import AppError from "../middlewares/appError.js";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from '../drizzle/schema.js';


const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) throw new AppError('DATABASE_URL not defined ', 500, 'ConfigError');

const postgresClient = postgres(databaseUrl);

export const db = drizzle(postgresClient, { schema, logger: true }) 