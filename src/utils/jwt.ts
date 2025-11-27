
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const jwtSecret = process.env.JWT_SECRET || "SECRET1.1"; // if no JWT_SECRET in .env then keep SECRET1.1 string as secret

export const createJWT = (id: string) => {
    return jwt.sign({ id }, jwtSecret, { expiresIn: '3d' }); // expire in 3 days
}

export const checkJWT = (token: string) => {
    return jwt.verify(token, jwtSecret) as { id: string };
} 