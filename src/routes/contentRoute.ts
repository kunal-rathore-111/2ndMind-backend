
import express from "express";
import { contentController } from "../controllers/contentController.js";
import { contentZod_MW, deleteContent_MW } from "../middlewares/contentMiddleware.js";

export const content = express();

content.post('/add', contentZod_MW, contentController.addContent);


content.delete('/delete/:contentId', deleteContent_MW, contentController.deleteContent);
/* 
will complete later
content.patch('/update', (req, res) => {
    res.status(200).json({
        message: "Updated"
    })
}); */

