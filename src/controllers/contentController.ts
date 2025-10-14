

import type { NextFunction, Request, Response } from "express";
import { addContentDBFunction, deleteContentDBFunction, getContentDBFunction } from "../services/contentModel.js";
import { deleteModel, type Types } from "mongoose";

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

const deleteContent = async (req: Request, res: Response) => {
    //@ts-ignore
    const { userId, contentId } = req;
    await deleteContentDBFunction({ userId, contentId });
    return res.status(200).json({
        message: "Deleted"
    });
}

export const contentController = { dashboard, addContent, deleteContent }