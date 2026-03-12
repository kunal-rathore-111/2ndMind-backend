import type { Request, Response } from "express";
import { createShareLinkFunc, dataByUserShareLinkFunc, deleteShareLinkFunc, getShareLinkFunc } from "../../services/share/userShareLinkService";
import AppError from "../../middlewares/appError";



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


const publicDashboard = async (req: Request, res: Response) => {
    const hash = Array.isArray(req.params.share_hash) ? req.params.share_hash[0] : req.params.share_hash;
    if (!hash) throw new AppError("Link not found", 404, "NotFound");
    const result = await dataByUserShareLinkFunc(hash);
    return res.status(200).json({
        result
    })
}


export const userShareController = { createORdeleteUserShareLink, getUserShareLink, publicDashboard };

