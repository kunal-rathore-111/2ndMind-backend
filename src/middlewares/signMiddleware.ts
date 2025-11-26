import type { Request, Response, NextFunction } from "express";

import AppError from "./appError.js";
import type { ZodSchema } from "zod";
// middleware factory= middleware inside function
export const signZod = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const result = schema.safeParse(req.body);

        if (result.success) return next();

        throw new AppError(`${result?.error?.issues?.[0]?.message}`, 400, 'BadRequest')

    }
}

