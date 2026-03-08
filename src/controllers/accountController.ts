import type { Request, Response } from "express"
import { deleteUser } from "../services/drizzle/usersTable";
import AppError from "../middlewares/appError";


const deleteAccount = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const result = await deleteUser(email, password);

    if (result.length === 0) {
        throw new AppError("User not deleted, please try again", 500, "InternalError")
    }
    return res.send({ message: "Account deleted successfully" });

}


export const accountController = { deleteAccount };