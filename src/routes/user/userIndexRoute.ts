
import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";

import { content } from "./contentRoute";
import { contentController } from "../../controllers/contentController";
import { userController } from "../../controllers/userShareController";
import { userAccount } from "./userAccountRoute";


export const user = express();

user.use('/content', authMiddleware, content);

user.use('/account', authMiddleware, userAccount);

user.get('/dashboard', authMiddleware, contentController.dashboard);

user.get('/share', authMiddleware, userController.getUserShareLink); // GET: Check if share link exists and return shareHash

user.post('/share', authMiddleware, userController.createORdeleteUserShareLink); // POST: Create or delete share link on the basis of existence in db

user.get('/public/:share_hash', contentController.publicDashboard);

