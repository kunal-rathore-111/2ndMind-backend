
import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";

import { content } from "./contentRoute";
import { contentController } from "../../controllers/contentController";
import { userController } from "../../controllers/userController";
import { userAccount } from "./userAccountRoute";


export const user = express();

user.use('/content', authMiddleware, content);

user.use('/account', authMiddleware, userAccount);

user.get('/dashboard', authMiddleware, contentController.dashboard);

user.get('/share', authMiddleware, userController.getShareLink); // GET: Check if share link exists

user.post('/share', authMiddleware, userController.shareLink); // POST: Create or delete share link

user.get('/public/:share_hash', contentController.publicDashboard);

