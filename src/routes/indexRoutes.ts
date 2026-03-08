
import express from "express";

import { sign } from "./signRoute"
import { user } from "./userRoute"

export const indexRoute = express();

// routes
indexRoute.use('/', sign);
indexRoute.use('/user', user);


