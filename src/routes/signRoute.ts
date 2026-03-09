
// dependencies
import express from "express";


import { signZod } from "../middlewares/signMiddleware";
import { signUpController, signInController, signOutController } from "../controllers/signController";
import { signInSchema, signUpSchema } from "../validator/zod/accountZod";
import { signLimiter } from "../utils/limiter";

export const sign = express();

process.env.NODE_ENV === "production" && sign.use(signLimiter);

// sign-up route
sign.post('/sign-up', signZod(signUpSchema), signUpController);


sign.post('/sign-in', signZod(signInSchema), signInController);

// logout route - no auth middleware needed (anyone can logout, even with invalid token)
sign.post('/sign-out', signOutController);

