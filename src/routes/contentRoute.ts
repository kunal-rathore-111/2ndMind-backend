
import express from "express";
import { contentController } from "../controllers/contentController.js";
import { contentZod } from "../middlewares/contentMiddleware.js";

export const content = express();

content.post('/add', contentZod, contentController.addContent);


content.delete('/delete', (req, res) => {
    res.status(200).json({
        message: "Deleted"
    })
});

content.patch('/update', (req, res) => {
    res.status(200).json({
        message: "Updated"
    })
});