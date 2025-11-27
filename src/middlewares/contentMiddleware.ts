import type { NextFunction, Request, Response } from "express";
import { contentValidator } from "../validator/zod/contentZod.js";
import AppError from "./appError.js";

// content zod validation
export const contentZod_MW = (req: Request, res: Response, next: NextFunction) => {
    const result = contentValidator(req.body);
    if (result.success) return next();
    else throw new AppError(`${result?.error?.issues?.[0]?.message}`, 400, 'BadRequest')
}

// content delete route contentId validation

export const Content_MW = (req: Request, res: Response, next: NextFunction) => {

    const contentId = req.params.contentId;
    if (!contentId) {
        throw new AppError("contendId not found", 404, 'NotFound');
    }
    req.contentId = contentId;
    return next();
}