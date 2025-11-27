
import crypto from 'crypto';
import { db } from '../../config/dbDrizzle.js';
import { ContentTable, LinkTable, UsersTable } from '../../drizzle/schema.js';
import { eq } from 'drizzle-orm';
import AppError from '../../middlewares/appError.js';




const hashLink = () => {
    return crypto.randomBytes(32).toString('hex');
}

export const createShareLinkFunc = async (userId: string) => {

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