
// dependencies
import express from "express";

import { signIn_Url } from '../utils/urls.js';
import { UsersModel } from "../collections/userCollection.js";
import { createJWT } from "../utils/jwt.js";

export const sign = express();

// sign-up route
sign.post('/sign-up', async (req, res) => {
    // zod+password hash (need to implement)
    const { username, password } = req.body;
    // storing in db
    await UsersModel.create({
        username, password
    });

    return res.status(201).json({
        message: "sign-up successfull",
        signIn_Url: signIn_Url
    });

});


sign.post('/sign-in', async (req, res) => {

    const { username, password } = req.body;
    const result = await UsersModel.findOne({
        username, password
    });
    if (result) {
        const jwtToken = createJWT(result._id);
        res.cookie('token', jwtToken).status(200).json({
            message: "Sign-in successfull"
        })
    }
    else {
        res.status(401).json({
            message: "User not found"
        })
    }


});


