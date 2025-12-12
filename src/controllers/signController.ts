import type { Request, Response } from "express";

import { createJWT } from "../utils/jwt.js";
import { createUser, findUser } from "../services/drizzle/usersTable.js";



export const signUpController = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    // Using email as username - no separate username field needed
    const userId = await createUser(email, email, password);

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

export const logoutController = (req: Request, res: Response) => {
    // Clear the authentication cookie by setting it with expired date

    res.cookie('token', '', {
        httpOnly: true,
        sameSite: process.env.NODE_ENV ? 'none' : 'lax',
        secure: process.env.NODE_ENV ? true : false,
        expires: new Date(0), // Set expiration to epoch (Jan 1, 1970) = immediately expired
    }).status(200).json({
        message: "Logout successful"
    });
}
