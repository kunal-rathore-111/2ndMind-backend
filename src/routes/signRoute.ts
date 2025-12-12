
// dependencies
import express from "express";


import { signZod } from "../middlewares/signMiddleware.js";
import { signUpController, signInController, logoutController } from "../controllers/signController.js";
import { signInSchema, signUpSchema } from "../validator/zod/signZod.js";
import { signLimiter } from "../utils/limiter.js";

export const sign = express();

//sign.use(signLimiter)

// sign-up route
sign.post('/sign-up', signZod(signUpSchema), signUpController);


sign.post('/sign-in', signZod(signInSchema), signInController);

// logout route - no auth middleware needed (anyone can logout, even with invalid token)
sign.post('/logout', logoutController);

