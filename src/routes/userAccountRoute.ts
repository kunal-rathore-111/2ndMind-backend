


import express from "express";
import { accountController } from "../controllers/accountController";

export const userAccount = express();


// user account updations like password, profile pic, name, email, deletion

userAccount.delete("/account-delete", accountController.deleteAccount);