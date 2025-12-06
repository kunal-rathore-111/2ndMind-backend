
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { content } from "./contentRoute.js";
import { contentController } from "../controllers/contentController.js";
import { userController } from "../controllers/userController.js";


export const user = express();

user.use('/content', authMiddleware, content);

user.get('/dashboard', authMiddleware, contentController.dashboard);

user.get('/share', authMiddleware, userController.getShareLink); // GET: Check if share link exists

user.post('/share', authMiddleware, userController.shareLink); // POST: Create or delete share link

user.get('/public/:share_hash', contentController.publicDashboard);
