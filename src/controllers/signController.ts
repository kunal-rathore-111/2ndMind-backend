import type { Request, Response } from "express";

import { createJWT } from "../utils/jwt";
import { createUser, findUser } from "../services/drizzle/usersTable";



export const signUpController = async (req: Request, res: Response) => {

    const { email, username, password } = req.body;
    // Using email as username - no separate username field needed
    const userId = await createUser(email, username, password);

    const token = createJWT(userId, username);
    return res.cookie('token', token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production" ? true : false,
    }).status(201).json({
        message: "Sign-up successfull",
    });// sending cookie so frontend handles  redirect to dashboard improves UX

}

export const signInController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // finding  does user exists in db 
    const result = await findUser(email, password);

    const jwtToken = createJWT(result.id, result.username); // creating jwt and sending in cookies
    res.cookie('token', jwtToken, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',// this logic for http (secure true) (none only works with secure true)
        secure: process.env.NODE_ENV === "production" ? true : false,
    }).status(200).json({
        message: "Sign-in successfull"
    })

}

export const signOutController = (req: Request, res: Response) => {
    // Clear the authentication cookie by setting it with expired date

    res.cookie('token', '', {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
        secure: process.env.NODE_ENV === "production" ? true : false,
        expires: new Date(0), // Set expiration to (Jan 1, 1970) = immediately expired
    }).status(200).json({
        message: "Signout successful"
    });
}
