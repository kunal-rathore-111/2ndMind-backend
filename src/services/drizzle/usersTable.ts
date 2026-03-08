import { db } from "../../config/dbDrizzle";
import { UsersTable } from "../../drizzle/schema";
import AppError from "../../middlewares/appError";
import { decodePassword, hashPassword } from "../../utils/hashFunc"
import { eq } from 'drizzle-orm';



export const createUser = async (username: string, email: string, password: string) => {

    const hashedPassword = await hashPassword(password);


    const user = await db.insert(UsersTable).values({
        username, email, password: hashedPassword
    }).returning({
        userId: UsersTable.id
    });
    if (!user[0]?.userId) throw new AppError("Signup failed, Please try again later", 500, "Database Error")
    return user[0]?.userId;

}
export const findUser = async (email: string, password: string) => {
    const user = await db.query.UsersTable.findFirst({
        where: eq(UsersTable.email, email)
    });

    if (!user) throw new AppError("User not found", 404, 'NotFound');

    const decodePasswordResponse = await decodePassword(password, user.password);
    if (!decodePasswordResponse) throw new AppError("Wrong password",
        401, "Unauthorized"
    )
    return user;
}