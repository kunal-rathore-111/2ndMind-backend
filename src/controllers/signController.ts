import type { Request, Response } from "express";

import { createJWT } from "../utils/jwt.js";
import { signIn_Url } from '../utils/urls.js';
import { createUser, findUser } from "../services/drizzle/usersTable.js";



export const signUpController = async (req: Request, res: Response) => {

    const { username, email, password } = req.body;
    // storing in db 
    const userId = await createUser(username, email, password);

    const token = createJWT(userId);
    return res.cookie('token', token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV ? 'none' : 'lax',
        secure: process.env.NODE_ENV ? true : false,
    }).status(201).json({
        message: "Sign-up successfull",
    });// sending cookie so frontend handles  redirect to dashboard improves UX

}

export const signInController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // finding  does user exists in db 
    const result = await findUser(email, password);

    const jwtToken = createJWT(result.id); // creating jwt and sending in cookies
    res.cookie('token', jwtToken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV ? 'none' : 'lax',
        secure: process.env.NODE_ENV ? true : false,
    }).status(200).json({
        message: "Sign-in successfull"
    })

}
