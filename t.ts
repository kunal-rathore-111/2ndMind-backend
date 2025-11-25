
import { db } from './src/config/dbDrizzle';
import { UsersTable } from './src/drizzle/schema';


async function main() {
    await db.insert(UsersTable).values({
        username: 'Kyle'
    });

    const user = await db.query.UsersTable.findFirst();
    console.log(user);
}

main();