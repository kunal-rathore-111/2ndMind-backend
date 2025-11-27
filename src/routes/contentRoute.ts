
import express from "express";
import { contentController } from "../controllers/contentController.js";
import { contentZod_MW, Content_MW } from "../middlewares/contentMiddleware.js";

export const content = express();

content.post('/add', contentZod_MW, contentController.addContent);


content.delete('/delete/:contentId', Content_MW, contentController.deleteContent);

content.patch('/update/:contentId', Content_MW, contentZod_MW, contentController.updateContent);

