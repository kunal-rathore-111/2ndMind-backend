
import mongoose, { model, Schema } from "mongoose";

const LinkSchema = new Schema({
    hash: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: "Users", required: true, unique: true }
})

export const LinkModel = model('Link', LinkSchema);