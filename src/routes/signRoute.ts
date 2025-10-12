
// dependencies
import express from "express";


import { signZod } from "../middlewares/signMiddleware.js";
import { signUpController, signInController } from "../controllers/signController.js";

export const sign = express();

// sign-up route
sign.post('/sign-up', signZod, signUpController);


sign.post('/sign-in', signZod, signInController);


