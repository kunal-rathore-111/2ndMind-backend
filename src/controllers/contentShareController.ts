import type { Request, Response } from "express";
import { createContentShareLinkFunc, deleteContentShareLinkFunc } from "../services/drizzle/contentShareLinkTable";



const createORdeleteShareLink = async (req: Request, res: Response) => {

    const share = req.body.share;

    const contentId = req.contentId;
    console.log(contentId);
    if (share) {
        const shareHash = await createContentShareLinkFunc(contentId);
        return res.json({ hash: shareHash })
    }
    else {
        await deleteContentShareLinkFunc(contentId);
        res.json({ message: "Share link deleted" });
    }
}

export const contentShareLinkController = { createORdeleteShareLink };