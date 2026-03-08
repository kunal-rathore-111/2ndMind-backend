import type { NextFunction, Request, Response } from "express";
import { contentValidator } from "../validator/zod/contentZod";
import AppError from "./appError";

// content zod validation
export const contentZod_MW = (req: Request, res: Response, next: NextFunction) => {
    const result = contentValidator(req.body);
    if (result.success) return next();
    else throw new AppError(`${result?.error?.issues?.[0]?.message}`, 400, 'BadRequest')
}

// content delete route contentId validation

export const Content_MW = (req: Request, res: Response, next: NextFunction) => {

    const contentId = Array.isArray(req.params.contentId) ? req.params.contentId[0] : req.params.contentId;
    if (!contentId) {
        throw new AppError("Content Id not found", 404, 'NotFound');
    }
    req.contentId = contentId;
    return next();
}