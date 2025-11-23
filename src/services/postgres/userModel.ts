
import { prisma } from "../../config/dbConfig.js";
import { hashPassword } from "../../utils/hashFunc.js";



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