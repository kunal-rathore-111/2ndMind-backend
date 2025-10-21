import type { Request, Response } from "express";

import { createJWT } from "../utils/jwt.js";
import { signIn_Url } from '../utils/urls.js';
import { createUser, findUser } from "../services/userModel.js";



export const signUpController = async (req: Request, res: Response) => {

    const { username, password } = req.body;
    // storing in db 
    await createUser(username, password);

    return res.status(201).json({
        message: "sign-up successfull",
        signIn_Url: signIn_Url  // returing url to signup page or may do token gene+ dashboard redirect
    });
}

export const signInController = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    // finding  does user exists in db 
    const result = await findUser(username, password);

    if (result) {
        const jwtToken = createJWT(result._id); // creating jwt and sending in cookies
        res.cookie('token', jwtToken, {
            httpOnly: true, sameSite: "lax", secure: false
        }).status(200).json({
            message: "Sign-in successfull"
        })
    }
    else {
        res.status(401).json({
            message: "User not found"
        })
    }
}
