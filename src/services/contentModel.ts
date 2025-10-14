import { z } from "zod";
import type mongoose from "mongoose";
import { ContentModel } from "../collections/contentsCollection.js";
import { contentZodSchema } from "../validator/zod/contentZod.js";

interface objectIdInterface {
    userId?: mongoose.Types.ObjectId
    contentId?: mongoose.Types.ObjectId | string
}

export const getContentDBFunction = async (userId: objectIdInterface) => {
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

export const deleteContentDBFunction = async (
    { userId, contentId }: objectIdInterface) => {
    console.log(userId);
    console.log("\nDB deleteContentDBFunction called\n");
    const d = await ContentModel.deleteOne({
        userId, _id: contentId
    });
    console.log(d);

}


