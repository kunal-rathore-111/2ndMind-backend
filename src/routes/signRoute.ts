
// dependencies
import express from "express";


import { signZod } from "../middlewares/signMiddleware.js";
import { signUpController, signInController } from "../controllers/signController.js";
import { signInSchema, signUpSchema } from "../validator/zod/signZod.js";

export const sign = express();

// sign-up route
sign.post('/sign-up', signZod(signUpSchema), signUpController);


sign.post('/sign-in', signZod(signInSchema), signInController);


