import { and, eq } from "drizzle-orm";
import { db } from "../../config/dbDrizzle";
import { ContentShareLinkTable, ContentTable } from "../../drizzle/schema";
import type { z } from "zod";
import type { contentZodSchema } from "../../validator/zod/contentZod";
import { createContentShareLinkFunc, deleteContentShareLinkFunc } from "../share/contentShareService";
import AppError from "../../middlewares/appError";


export const getContentService = async (userId: string) => {
    const data = await db.select().from(ContentTable).leftJoin(ContentShareLinkTable, eq(ContentShareLinkTable.contentId, ContentTable.id)).where(eq(ContentTable.userId, userId));
    console.log("\n\n\n", data, "\n\n\n");
    return data;
}

export const addContentService = async (data: z.infer<typeof contentZodSchema>, userId: string) => {

    const { title, description, link, tags, category, share } = data;
    console.log("\nDB addContentDBFunction called\n");


    const result = await db.insert(ContentTable).values(
        { title, description, link, tags, category, userId } // if description or tags are undefined then drizzle wrap them as null in database cause they are not defined as notNull in schema
    ).returning({ contentId: ContentTable.id });

    if (result[0]?.contentId) {
        const isNewContent = true;
        if (share) await createContentShareLinkFunc(result[0]?.contentId, isNewContent);
    }
    // means something gone wrong throw error
    else {
        throw new AppError("Something went wrong while adding new content", 500, "DB error", true)
    }

}


interface deleteContent_DTO {
    userId: string
    contentId: string
}

export const deleteContentService = async (
    { userId, contentId }: deleteContent_DTO) => {

    console.log("\nDB deleteContentDBFunction called\n");
    const result = await db.delete(ContentTable).where(and(
        eq(ContentTable.userId, userId),
        eq(ContentTable.id, contentId)
    )).returning({ userId: ContentTable.userId });

    if (!result[0]?.userId) throw new AppError("Content not found", 404, "Not found")
    else return;
}


interface updateContent_DTO extends deleteContent_DTO {
    userId: string
    contentId: string,
    newColumnData: z.infer<typeof contentZodSchema>
}


export const updateContentService = async (
    { userId, contentId, newColumnData }: updateContent_DTO) => {

    const { title, description, link, category, tags } = newColumnData;
    console.log("\nDB updateContentDBFunction called\n");


    const result = await db.update(ContentTable).set({ title, description, link, category, tags }).where(and(
        eq(ContentTable.userId, userId),
        eq(ContentTable.id, contentId)
    )).returning({ contentId: ContentTable.id });

    if (!result[0]?.contentId) {
        throw new AppError("Content not found", 404, "Not found")
    }
    else return;

}
