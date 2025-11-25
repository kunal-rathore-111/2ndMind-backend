import type { RequestHandler } from "express";

import { randomUUID } from "crypto";

export const requestIdMiddleware: RequestHandler = (req, res, next) => {
    req.requestId = randomUUID();
    next();
}