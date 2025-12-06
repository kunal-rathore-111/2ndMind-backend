import { and, eq } from "drizzle-orm";
import { db } from "../../config/dbDrizzle.js";
import { ContentTable } from "../../drizzle/schema.js";
import type { z } from "zod";
import type { contentZodSchema } from "../../validator/zod/contentZod.js";


export const getContentDBFunction = async (userId: string) => {
    return await db.query.ContentTable.findMany({
        where: eq(ContentTable.userId, userId)
    })
}

export const addContentDBFunction = async (data: z.infer<typeof contentZodSchema>, userId: string) => {
    let { title, description, link, tags, type } = data;

    console.log("\nDB addContentDBFunction called\n");


    await db.insert(ContentTable).values(
        { title, description, link, tags, type, userId }  // if description or tags are undefined then drizzle wrap them as null in database cause they are not defined as notNull in schema
    );
}


interface deleteContent_DTO {
    userId: string
    contentId: string
}

export const deleteContentDBFunction = async (
    { userId, contentId }: deleteContent_DTO) => {

    console.log("\nDB deleteContentDBFunction called\n");
    const d = await db.delete(ContentTable).where(and(
        eq(ContentTable.userId, userId),
        eq(ContentTable.id, contentId)
    ));

    console.log(d);

}



interface updateContent_DTO extends deleteContent_DTO {
    userId: string
    contentId: string,
    newColumnData: z.infer<typeof contentZodSchema>
}


export const updateContentDBFunction = async (
    { userId, contentId, newColumnData }: updateContent_DTO) => {

    console.log("\nDB updateContentDBFunction called\n");


    await db.update(ContentTable).set(newColumnData).where(and(
        eq(ContentTable.userId, userId),
        eq(ContentTable.id, contentId)
    ));

}
