
import express from "express";

import { sign } from "./sign/signRoute"
import { user } from "./user/userIndexRoute"

export const indexRoute = express();

// routes
indexRoute.use('/', sign);
indexRoute.use('/user', user);


