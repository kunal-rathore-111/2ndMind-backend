import { z } from "zod";
import type mongoose from "mongoose";
import { ContentModel } from "../collections/contentsCollection.js";
import { contentZodSchema } from "../validator/zod/contentZod.js";


export const getContentDBFunction = async (userId: mongoose.Types.ObjectId) => {
    return await ContentModel.find({
        userId
    });
}

export const addContentDBFunction = async (data: z.infer<typeof contentZodSchema>, userId: mongoose.Types.ObjectId) => {

    console.log("\nDB addContentDBFunction called\n");

    const { title, discription, link, tags } = data;
    await ContentModel.create({
        title, discription, link, tags, userId
    });
}
