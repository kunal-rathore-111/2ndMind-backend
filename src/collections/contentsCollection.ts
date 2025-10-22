
import mongoose, { model, Schema } from "mongoose";
import { required } from "zod/mini";

const tag = new Schema({
    tag: { type: String, require: true },
});

const ContentSchema = new Schema({
    title: { type: String, require: true },
    discription: { type: String },
    link: { type: String, required: true },
    type: { type: String, enum: ['Youtube', 'Twitter', 'Other'], required: true },
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'Users' }
})

export const ContentModel = model("ContentModel", ContentSchema);