import type { NextFunction, Request, Response } from "express";
import { contentValidator } from "../validator/zod/contentZod.js";
import { Types } from "mongoose";

// content zod validation
export const contentZod_MW = (req: Request, res: Response, next: NextFunction) => {
    const result = contentValidator(req.body);
    if (result.success) next();
    else res.status(422).json({ message: "wrong inputs need to change to zod error using global middleware" });

    console.log(result);

}

// content delete route contentId validation

export const deleteContent_MW = (req: Request, res: Response, next: NextFunction) => {

    const contentId = req.params.contentId;
    if (!contentId) {
        return res.status(400).json({ message: "Content not found (id not found)" });

    }
    if (!Types.ObjectId.isValid(contentId)) {
        return res.status(400).json({ message: "Invalid content id" })
    }
    else {
        //@ts-ignore
        req.contentId = new Types.ObjectId(contentId);
        next();
    }
}