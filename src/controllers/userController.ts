import type { Request, Response } from "express";
import { createShareLinkFunc, deleteShareLinkFunc } from "../services/linkModel.js";


const shareLink = async (req: Request, res: Response) => {

    const share = req.body.share;
    //@ts-ignore
    const userId = req.userId;
    console.log(userId);
    if (share) {
        const shareLink = await createShareLinkFunc(userId);
        res.json({ url: shareLink })
    }
    else {
        await deleteShareLinkFunc(userId);
        res.json({ message: "Share link deleted" });
    }
}

export const userController = { shareLink };