
import mongoose, { model, Schema } from "mongoose";

const tag = new Schema({
    tag: { type: String, require: true },
});

const ContentSchema = new Schema({
    title: { type: String, require: true },
    discription: { type: String },
    link: { type: String },
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'Users' }
})

export const ContentModel = model("ContentModel", ContentSchema);