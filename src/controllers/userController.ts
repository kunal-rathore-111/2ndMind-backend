import type { Request, Response } from "express";
import { createShareLinkFunc, deleteShareLinkFunc, getShareLinkFunc } from "../services/drizzle/linkTable.js";



const shareLink = async (req: Request, res: Response) => {

    const share = req.body.share;

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

const getShareLink = async (req: Request, res: Response) => {

    const userId = req.userId;

    const shareHash = await getShareLinkFunc(userId);

    if (shareHash) {
        res.json({ exists: true, hash: shareHash });
    } else {
        res.json({ exists: false, hash: null });
    }
}

export const userController = { shareLink, getShareLink };