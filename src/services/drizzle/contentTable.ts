import { and, eq } from "drizzle-orm";
import { db } from "../../config/dbDrizzle.js";
import { ContentTable } from "../../drizzle/schema.js";
import type { z } from "zod";
import type { contentZodSchema } from "../../validator/zod/contentZod.js";


export const getContentDBFunction2 = async (userId: string) => {
    return await db.query.ContentTable.findMany({
        where: eq(ContentTable.userId, userId)
    })
}

export const addContentDBFunction2 = async (data: z.infer<typeof contentZodSchema>, userId: string) => {
    let { title, description, link, tags, type } = data;

    console.log("\nDB addContentDBFunction called\n");


    await db.insert(ContentTable).values(
        { title, description, link, tags, type, userId }  // if discription or tags are undefined then drizzle wrap them as null in database cause they are not defined as notNull in schema
    );
}


interface objectIdInterface {
    userId: string
    contentId: string
}

export const deleteContentDBFunction2 = async (
    { userId, contentId }: objectIdInterface) => {

    console.log("\nDB deleteContentDBFunction called\n");
    const d = await db.delete(ContentTable).where(and(
        eq(ContentTable.userId, userId),
        eq(ContentTable.id, contentId)
    ));

    console.log(d);

}
