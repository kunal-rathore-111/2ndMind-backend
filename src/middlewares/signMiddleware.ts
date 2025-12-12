import type { Request, Response, NextFunction } from "express";

import AppError from "./appError.js";
import type { ZodSchema } from "zod";
// middleware factory= middleware inside function
export const signZod = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const result = schema.safeParse(req.body);

        if (result.success) return next();

        // Format all validation errors into a readable message
        const errorMessages = result.error.issues
            .map(issue => `${issue.path.join('.')}: ${issue.message}`)
            .join(', ');
        throw new AppError(errorMessages, 400, 'BadRequest')

    }
}

