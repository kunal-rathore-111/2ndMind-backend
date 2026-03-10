import { and, eq } from "drizzle-orm";
import { db } from "../../config/dbDrizzle";
import { ContentTable } from "../../drizzle/schema";
import type { z } from "zod";
import type { contentZodSchema } from "../../validator/zod/contentZod";


export const getContentService = async (userId: string) => {
    return await db.query.ContentTable.findMany({
        where: eq(ContentTable.userId, userId)
    })
}

export const addContentService = async (data: z.infer<typeof contentZodSchema>, userId: string) => {

    const { title, description, link, tags, category } = data;
    console.log("\nDB addContentDBFunction called\n");


    await db.insert(ContentTable).values(
        { title, description, link, tags, category, userId }  // if description or tags are undefined then drizzle wrap them as null in database cause they are not defined as notNull in schema
    );
}


interface deleteContent_DTO {
    userId: string
    contentId: string
}

export const deleteContentService = async (
    { userId, contentId }: deleteContent_DTO) => {

    console.log("\nDB deleteContentDBFunction called\n");
    const d = await db.delete(ContentTable).where(and(
        eq(ContentTable.userId, userId),
        eq(ContentTable.id, contentId)
    )).returning({ userId: ContentTable.userId });

    console.log(d);
    return d;

}



interface updateContent_DTO extends deleteContent_DTO {
    userId: string
    contentId: string,
    newColumnData: z.infer<typeof contentZodSchema>
}


export const updateContentService = async (
    { userId, contentId, newColumnData }: updateContent_DTO) => {

    console.log("\nDB updateContentDBFunction called\n");


    await db.update(ContentTable).set(newColumnData).where(and(
        eq(ContentTable.userId, userId),
        eq(ContentTable.id, contentId)
    ));

}
