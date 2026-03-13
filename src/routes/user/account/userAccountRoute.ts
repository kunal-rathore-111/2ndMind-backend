


import express from "express";
import { signZod } from "../../../middlewares/signMiddleware";
import { updatePassswordSchema, signInSchema } from "../../../validator/zod/accountZod";
import { checkBothPasswordsDiff_MW } from "../../../middlewares/accountMiddleware";
import { accountController } from "../../../controllers/user/accountController";

export const userAccount = express();

// user account updations like password, profile pic, name, email, deletion


// email password validation(reusing zod sign middleware for valdating email and password) then query on db
userAccount.delete("/delete-user-account", signZod(signInSchema), accountController.deleteAccount);

userAccount.patch("/update-user-password", signZod(updatePassswordSchema), checkBothPasswordsDiff_MW, accountController.updatePassword);