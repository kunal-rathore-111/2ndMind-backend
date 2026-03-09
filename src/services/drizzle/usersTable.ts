import { db } from "../../config/dbDrizzle";
import { UsersTable } from "../../drizzle/schema";
import AppError from "../../middlewares/appError";
import { decodePassword, hashPassword } from "../../utils/hashFunc"
import { eq } from 'drizzle-orm';
import type { SignInTypes, SignUpTypes, UpdatePasswordTypes } from "../../validator/zod/accountZod";
import { setDefaultResultOrder } from "dns/promises";



export const createUser = async ({ username, email, password }: SignUpTypes) => {

    const hashedPassword = await hashPassword(password);


    const user = await db.insert(UsersTable).values({
        username, email, password: hashedPassword
    }).returning({
        userId: UsersTable.id
    });
    if (!user[0]?.userId) throw new AppError("Signup failed, Please try again later", 500, "Database Error")
    return user[0]?.userId;

}
export const findUser = async ({ email, password }: SignInTypes) => {
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

export const deleteAccountService = async ({ email, password }: SignInTypes) => {

    // first find user with the email and password, if found then delete
    const user = await findUser({ email, password });
    return await db.delete(UsersTable).where(eq(UsersTable.id, user.id)).returning();

}

export const updatePasswordService = async ({ email, password, newPassword }: UpdatePasswordTypes) => {

    // first find user with the email and password, if found then updatePassword
    const user = await findUser({ email, password });

    const updatedHashedPass = await hashPassword(newPassword);

    const result = await db.update(UsersTable).set({ password: updatedHashedPass }).where(eq(UsersTable.id, user.id)).returning({ userId: UsersTable.id }); // returning to prevent race condition by responsing accordingly in controller, which may occur do due large user base
    return result;

}