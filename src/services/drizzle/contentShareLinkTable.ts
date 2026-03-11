
import crypto from 'crypto';
import { db } from '../../config/dbDrizzle';
import { ContentShareLinkTable, ContentTable, UserShareLinkTable, UsersTable } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import AppError from '../../middlewares/appError';




const hashLink = () => {
    return crypto.randomBytes(32).toString('hex');
}

export const createContentShareLinkFunc = async (contentId: string, isNewContent: boolean) => {
    // First, check if user already has a share link if not new content
    if (!isNewContent) {
        const existingLink = await db.select().from(ContentShareLinkTable).where(eq(ContentShareLinkTable.contentId, contentId));
        // If link exists, return the existing hash instead of creating a new one
        if (existingLink.length > 0 && existingLink[0]) {
            return existingLink[0].contentSharehash;
        }
    }
    // If no link exists or new content then create a new one
    const contentSharehash = hashLink();
    await db.insert(ContentShareLinkTable).values({
        contentSharehash,
        contentId
    });
    return contentSharehash;
}


export const deleteContentShareLinkFunc = async (contentId: string) => {

    await db.delete(UserShareLinkTable).where((eq(ContentShareLinkTable.contentId, contentId)));
}


export const dataByContentShareLinkFunc = async (content_share_Hash: string) => {

    const result = await db.select().from(ContentShareLinkTable).innerJoin(ContentTable, eq(ContentShareLinkTable.contentId, ContentTable.id)).where(eq(ContentShareLinkTable.contentSharehash, content_share_Hash));
    console.log("\n\n", result, '\n\n');
    if (!result.length) throw new AppError("Content not found", 404, "Not found")
    return result;
}