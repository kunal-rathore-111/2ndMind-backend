
import crypto from 'crypto';
import { db } from '../../config/dbDrizzle.js';
import { ContentTable, LinkTable, UsersTable } from '../../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import AppError from '../../middlewares/appError.js';




const hashLink = () => {
    return crypto.randomBytes(32).toString('hex');
}

export const createShareLinkFunc = async (userId: string) => {
    // First, check if user already has a share link
    const existingLink = await db.select().from(LinkTable).where(eq(LinkTable.userId, userId));

    // If link exists, return the existing hash instead of creating a new one
    if (existingLink.length > 0 && existingLink[0]) {
        return existingLink[0].linkHash;
    }

    // If no link exists, create a new one
    const linkHash = hashLink();
    await db.insert(LinkTable).values({
        linkHash,
        userId
    });
    return linkHash;
}


export const deleteShareLinkFunc = async (userId: string) => {

    await db.delete(LinkTable).where((eq(LinkTable.userId, userId)));
}

export const getShareLinkFunc = async (userId: string) => {
    const existingLink = await db.select().from(LinkTable).where(eq(LinkTable.userId, userId));

    if (existingLink.length > 0 && existingLink[0]) {
        return existingLink[0].linkHash;
    }

    return null; // No link exists
}



export const dataByShareLinkFunc = async (linkHash: string) => {

    const data = await db.select({
        UsersData: UsersTable,
        ContentData: ContentTable
    }).
        from(LinkTable).
        innerJoin(UsersTable, eq(LinkTable.userId, UsersTable.id)).
        leftJoin(ContentTable, eq(UsersTable.id, ContentTable.userId)).
        where(eq(LinkTable.linkHash, linkHash));

    // if userDeleted then it will have nothing(so throw error), or if userExists but no content then due to leftJoin it will contain one row with UsersData and ContnentData one row having null (so if condition fails or skip)
    if (!data.length) throw new AppError('User Not Found', 404, 'NotFound');

    // it traverse array of data and every contentdata will stored in contentArray by filtering that the contentdata is not null so empty array if no data found instead null(it helps in frontend while rendering data)
    const contentArray = data.map(d => d.ContentData).filter(d2 => d2 != null);
    return contentArray;
}