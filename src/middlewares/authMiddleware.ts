
import type { Request, Response, NextFunction } from "express";
import { checkJWT } from "../utils/jwt.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req?.cookies?.token;
    if (!token) res.status(403).json({ message: "You're not logged-in" })
    const decodeOp = checkJWT(token);
    if (decodeOp) {
        //@ts-ignore
        req.userId = decodeOp.id;
        next();
    }
    else res.status(401).json({ message: "Invalid token, Please login again" });  // need to handle jwt errors using global middleware
}