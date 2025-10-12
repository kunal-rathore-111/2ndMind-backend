
import express from "express";
import { contentController } from "../controllers/contentController.js";

export const content = express();

content.post('/add', contentController.addContent);


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