
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { content } from "./contentRoute.js";
import { contentController } from "../controllers/contentController.js";
import { userController } from "../controllers/userController.js";


export const user = express();
user.use('/content', authMiddleware, content);

user.get('/dashboard', authMiddleware, contentController.dashboard);
user.post('/share', authMiddleware, userController.shareLink);

user.get('/shared-user/:share_hash', contentController.publicDashboard);
