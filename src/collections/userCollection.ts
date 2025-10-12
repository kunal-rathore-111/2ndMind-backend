
import { model, Schema } from "mongoose";


const UsersSchema = new Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true }
}, { timestamps: true });

export const UsersModel = model("Users", UsersSchema);