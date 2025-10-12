

import { UsersModel } from "../collections/userCollection.js";

export const createUser = async (username: string, password: string) => {
    //  need to hash password + errors
    await UsersModel.create({
        username, password
    });
}
export const findUser = async (username: string, password: string) => {
    //  need to hash password + errors
    return await UsersModel.findOne({
        username, password
    });
}