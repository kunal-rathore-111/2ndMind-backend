
import { prisma } from "../../config/dbConfig.js";
import AppError from "../../middlewares/appError.js";
import { decodePassword, hashPassword } from "../../utils/hashFunc.js";

//any error throws directly and catched by the errorMiddleware

export const createUser2 = async (username: string, password: string) => {
    //  need to handle errors
    const hashedPassword = await hashPassword(password);
    const user = await prisma.usersModel.create(
        {
            data: {
                username, password: hashedPassword
            }
        }
    );
    console.log('User created- ', user);

}


export const findUser2 = async (username: string, password: string) => {

    const result = await prisma.usersModel.findUnique({
        where: { username }
    });
    if (!result) throw new AppError("User not found", 404, 'NotFound');

    const Response = await decodePassword(password, result.password);
    if (Response) return result;
    throw new AppError("Wrong password", 401, 'InvalidPassword')
}