import type { Request, Response } from "express";
import { createShareLinkFunc, deleteShareLinkFunc, getShareLinkFunc } from "../services/drizzle/userShareLinkTable";



const createORdeleteUserShareLink = async (req: Request, res: Response) => {

    const share = req.body.share;

    const userId = req.userId;
    console.log(userId);
    if (share) {
        const shareHash = await createShareLinkFunc(userId);
        return res.json({ hash: shareHash })
    }
    else {
        await deleteShareLinkFunc(userId);
        res.json({ message: "Share link deleted" });
    }
}

const getUserShareLink = async (req: Request, res: Response) => {

    const userId = req.userId;

    const shareHash = await getShareLinkFunc(userId);

    if (shareHash) {
        return res.json({ exists: true, hash: shareHash });
    } else {
        return res.json({ exists: false, hash: null });
    }
}

export const userController = { createORdeleteUserShareLink, getUserShareLink };