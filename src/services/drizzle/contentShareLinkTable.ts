
import crypto from 'crypto';
import { db } from '../../config/dbDrizzle';
import { ContentShareLinkTable, ContentTable, UserShareLinkTable, UsersTable } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';




const hashLink = () => {
    return crypto.randomBytes(32).toString('hex');
}

export const createContentShareLinkFunc = async (contentId: string) => {
    // First, check if user already has a share link
    const existingLink = await db.select().from(ContentShareLinkTable).where(eq(ContentShareLinkTable.contentId, contentId));

    // If link exists, return the existing hash instead of creating a new one
    if (existingLink.length > 0 && existingLink[0]) {
        return existingLink[0].contentSharehash;
    }

    // If no link exists, create a new one
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


