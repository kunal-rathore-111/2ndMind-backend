

import type { Request, Response } from "express";
import { dataByShareLinkFunc } from "../services/drizzle/linkTable.js";
import { addContentDBFunction, deleteContentDBFunction, getContentDBFunction, updateContentDBFunction } from "../services/drizzle/contentTable.js";
import AppError from "../middlewares/appError.js";


export const dashboard = async (req: Request, res: Response) => {

    const userId = req.userId;


    const data = await getContentDBFunction(userId);
    res.status(200).json({
        message: "Dashboard loads successfull",
        data
    });
}


const addContent = async (req: Request, res: Response) => {

    const userId = req.userId;

    await addContentDBFunction(req.body, userId);
    res.status(200).json({
        message: "Content added"
    });
}

const deleteContent = async (req: Request, res: Response) => {
    const userId = req.userId;
    const contentId = req.contentId;


    await deleteContentDBFunction({ userId, contentId });
    return res.status(200).json({
        message: "Deleted"
    });
}

const updateContent = async (req: Request, res: Response) => {
    const userId = req.userId;
    const contentId = req.contentId;
    const newColumnData = req.body;

    await updateContentDBFunction({ userId, contentId, newColumnData });
    return res.status(200).json({
        message: "Deleted"
    });
}

const publicDashboard = async (req: Request, res: Response) => {
    const hash = req.params.share_hash;
    if (!hash) throw new AppError("Link not found", 404, "NotFound");
    const result = await dataByShareLinkFunc(hash);
    return res.status(200).json({
        result
    })

}

export const contentController = { dashboard, addContent, deleteContent, updateContent, publicDashboard }