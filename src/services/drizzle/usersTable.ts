import { db } from "../../config/dbDrizzle.js";
import { UsersTable } from "../../drizzle/schema.js";
import AppError from "../../middlewares/appError.js";
import { decodePassword, hashPassword } from "../../utils/hashFunc.js"



export const createUser2 = async (username: string, email: string, password: string) => {
    const hashedPassword = await hashPassword(password);

    await db.insert(UsersTable).values({
        username, email, password: hashedPassword
    });
}
export const findUser2 = async (email: string, password: string) => {
    const result = await db.query.UsersTable.findFirst({
        where: (UsersTable, { eq }) => eq(UsersTable.email, email)
    });
    if (!result) throw new AppError("User not found", 404, 'NotFound');

    const decodePasswordResponse = await decodePassword(password, result.password);
    if (!decodePasswordResponse) throw new AppError("Wrong password",
        401, "Unauthorized"
    )
    return result;
}