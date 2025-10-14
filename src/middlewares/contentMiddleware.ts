import type { NextFunction, Request, Response } from "express";
import { contentValidator } from "../validator/zod/contentZod.js";


export const contentZod = (req: Request, res: Response, next: NextFunction) => {
    const result = contentValidator(req.body);
    if (result.success) next();
    else res.status(422).json({ message: "wrong inputs need to change to zod error using global middleware" });

    console.log(result);

}
