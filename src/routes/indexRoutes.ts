
import express from "express";

import { sign } from "./signRoute.js"
import { user } from "./userRoute.js"

export const indexRoute = express();

// routes
indexRoute.use('/', sign);
indexRoute.use('/user', user);


