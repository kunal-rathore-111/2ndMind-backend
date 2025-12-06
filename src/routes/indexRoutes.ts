
import express from "express";

import { sign } from "./signRoute.js"
import { user } from "./userRoute.js"

export const indexRoute = express();

// routes
indexRoute.use('/', sign);
indexRoute.use('/user', user);

//inital route
indexRoute.get("/", (req, res) => {
    res.json({ message: "Hii from inital route" });
})

