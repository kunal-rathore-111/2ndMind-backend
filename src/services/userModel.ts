

import { UsersModel } from "../collections/userCollection.js";
import { decodePassword, hashPassword } from "../utils/hashFunc.js";

export const createUser = async (username: string, password: string) => {
    //  need to handle errors
    const hashedPassword = await hashPassword(password);
    await UsersModel.create({
        username, password: hashedPassword
    });
}
export const findUser = async (username: string, password: string) => {

    const result = await UsersModel.findOne({
        username
    });
    if (!result?.password) {
        console.log('userNot Found');
        return;
    }
    else {
        const Response = await decodePassword(password, result.password);
        if (Response) return result;
        else return;
    }
}