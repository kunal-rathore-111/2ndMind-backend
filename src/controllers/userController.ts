import type { Request, Response } from "express";
import { createShareLinkFunc, deleteShareLinkFunc } from "../services/linkModel.js";


const shareLink = async (req: Request, res: Response) => {

    const share = req.body.share;
    //@ts-ignore
    const userId = req.userId;
    console.log(userId);
    if (share) {
        const shareHash = await createShareLinkFunc(userId);
        res.json({ hash: shareHash })
    }
    else {
        await deleteShareLinkFunc(userId);
        res.json({ message: "Share link deleted" });
    }
}

export const userController = { shareLink };