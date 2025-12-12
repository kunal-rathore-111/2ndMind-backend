
import type { Request, Response, NextFunction } from "express";
import { checkJWT } from "../utils/jwt.js";
import AppError from "./appError.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req?.cookies?.token;
    if (!token) throw new AppError("Please Login-again", 401, "Unauthorized");
    const decodeOp = checkJWT(token);
    if (decodeOp) {
        req.userId = decodeOp.id;
        next();
    }
    else throw new AppError("Please Login-again", 401, "Unauthorized");
}