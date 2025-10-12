

import type { NextFunction, Request, Response } from "express";

export const dashboard = (req: Request, res: Response, next: NextFunction) => {

    res.status(200).json({
        message: "Dashboard loads successfull"
    });
}

const addContent = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "Added"
    });
}

export const contentController = { dashboard, addContent }