
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { content } from "./contentRoute.js";
import { contentController } from "../controllers/contentController.js";


export const user = express();
user.use('/content', authMiddleware, content);

user.get('/dashboard', authMiddleware, contentController.dashboard);

