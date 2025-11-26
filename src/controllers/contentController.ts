

import type { NextFunction, Request, Response } from "express";
import { dataByShareLinkFunc } from "../services/drizzle/linkTable.js";
import { addContentDBFunction, deleteContentDBFunction, getContentDBFunction } from "../services/drizzle/contentTable.js";



export const dashboard = async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const userId = req.userId;
    const data = await getContentDBFunction(userId);
    res.status(200).json({
        message: "Dashboard loads successfull",
        data
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
    const userId = req.userId;
    //@ts-ignore
    const contentId = req.contentId;
    await deleteContentDBFunction({ userId, contentId });
    return res.status(200).json({
        message: "Deleted"
    });
}

const publicDashboard = async (req: Request, res: Response) => {
    const hash = req.params.share_hash;
    if (!hash) return 'no hash found';
    const result = await dataByShareLinkFunc(hash);
    return res.json({
        result
    })

}

export const contentController = { dashboard, addContent, deleteContent, publicDashboard }