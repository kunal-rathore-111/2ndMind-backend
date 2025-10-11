// dependencies
import express from "express";
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from "mongoose";
import { z } from "zod";
import jwt from "jsonwebtoken";


import { signIn_Url } from './utils/urls.js';
// import { zodMiddleware } from './middlewares/sign.js'
dotenv.config();
const app = express();
const PORT = 4001;
app.use(morgan('dev'));



app.post('/app/v1/sign-up', (req, res) => {
    res.status(201).json({
        message: "sign-up successfull",
        signIn_Url: signIn_Url
    });

});


app.post('/app/v1/sign-in', (req, res) => {
    res.status(200).json({
        message: "Sign-in successfull"
    })
});


app.get('/app/v1/dashboard', (req, res) => {
    res.status(200).json({
        message: "Dashboard successfull"
    })
});


app.post('/app/v1/add', (req, res) => {
    res.status(200).json({
        message: "Added"
    })
});


app.delete('/app/v1/delete', (req, res) => {
    res.status(200).json({
        message: "Deleted"
    })
});

app.patch('/app/v1/update', (req, res) => {
    res.status(200).json({
        message: "Updated"
    })
});

app.listen(PORT, () => { console.log(`Server started at ${PORT}`) })