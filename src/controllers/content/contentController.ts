

import type { Request, Response } from "express";
import { addContentService, deleteContentService, getContentService, updateContentService } from "../../services/content/contentService";
import AppError from "../../middlewares/appError";


export const dashboard = async (req: Request, res: Response) => {

    const userId = req.userId;

    const data = await getContentService(userId);
    res.status(200).json({
        message: "Dashboard loads successfull",
        data
    });
}


const addContent = async (req: Request, res: Response) => {

    const userId = req.userId;

    await addContentService(req.body, userId);
    res.status(200).json({
        message: "Content added"
    });
}

const deleteContent = async (req: Request, res: Response) => {
    const userId = req.userId;
    const contentId = req.contentId;

    await deleteContentService({ userId, contentId });
    // handles if content deleted -- because drizzle throwing error if no data found on deleting 

    return res.status(200).json({
        message: "Deleted"
    });
}

const updateContent = async (req: Request, res: Response) => {
    const userId = req.userId;
    const contentId = req.contentId;
    const newColumnData = req.body;

    await updateContentService({ userId, contentId, newColumnData });
    return res.status(200).json({
        message: "Content updated"
    });
}

export const contentController = { dashboard, addContent, deleteContent, updateContent }