


import express from "express";
import { accountController } from "../../controllers/accountController";
import { signZod } from "../../middlewares/signMiddleware";
import { signInSchema } from "../../validator/zod/signZod";

export const userAccount = express();


// user account updations like password, profile pic, name, email, deletion

// email password validation(reusing zod sign middleware) then query on db
userAccount.delete("/account-delete", signZod(signInSchema), accountController.deleteAccount);