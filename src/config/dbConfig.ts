import { Pool } from 'pg';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import AppError from "../middlewares/appError.js";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) throw new AppError('DATABASE_URL NOT FOUND', 504, 'ConfigError');

const pool = new Pool({
    connectionString: DATABASE_URL
})

//connects Prisma Client to Postgres database
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

export const connectPostgres = async () => {
    try {
        console.log("PostgresDB connecting");
        await prisma.$connect();
        console.log('PostgresDB connected');
    } catch (e) {
        console.error('Error while connecting ', e);
        throw new AppError('Something went wrong while connecting the database', 500, 'DBError')
    }
}