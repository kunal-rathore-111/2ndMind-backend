import type { Request, Response, NextFunction } from "express";

import { signValidator } from "../validator/zod.js";

export const signZod = (req: Request, res: Response, next: NextFunction) => {
    const result = signValidator(req.body);
    if (result.success) next();
    else res.status(422).json({ message: "wrong inputs need to change to zod error using global middleaware" });
}

