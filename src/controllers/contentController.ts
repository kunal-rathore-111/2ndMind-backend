

import type { NextFunction, Request, Response } from "express";
import { addContentDBFunction, getContentDBFunction } from "../services/contentModel.js";

export const dashboard = async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const userId = req.userId;
    const result = await getContentDBFunction(userId);
    res.status(200).json({
        message: "Dashboard loads successfull",
        result
    });
}

const addContent = async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const userId = req.userId;
    await addContentDBFunction(req.body, userId);
    res.status(200).json({
        message: "Content added"
    });
}

export const contentController = { dashboard, addContent }