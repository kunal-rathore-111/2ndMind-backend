


import express from "express";
import { accountController } from "../../controllers/accountController";
import { signZod } from "../../middlewares/signMiddleware";
import { updatePassswordSchema, signInSchema } from "../../validator/zod/accountZod";
import { checkBothPasswordsDiff_MW } from "../../middlewares/accountMiddleware";

export const userAccount = express();


// user account updations like password, profile pic, name, email, deletion

// email password validation(reusing zod sign middleware) then query on db
userAccount.delete("/account-delete", signZod(signInSchema), accountController.deleteAccount);

userAccount.patch("/account-updatePassword", signZod(updatePassswordSchema), checkBothPasswordsDiff_MW, accountController.updatePassword);