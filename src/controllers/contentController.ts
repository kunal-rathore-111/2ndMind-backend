

import type { Request, Response } from "express";
import { dataByShareLinkFunc } from "../services/drizzle/userShareLinkTable";
import { addContentDBFunction, deleteContentDBFunction, getContentDBFunction, updateContentDBFunction } from "../services/drizzle/contentTable";
import AppError from "../middlewares/appError";


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
    const hash = Array.isArray(req.params.share_hash) ? req.params.share_hash[0] : req.params.share_hash;
    if (!hash) throw new AppError("Link not found", 404, "NotFound");
    const result = await dataByShareLinkFunc(hash);
    return res.status(200).json({
        result
    })

}

export const contentController = { dashboard, addContent, deleteContent, updateContent, publicDashboard }