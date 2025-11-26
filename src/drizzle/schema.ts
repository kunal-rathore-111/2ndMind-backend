import { relations } from "drizzle-orm";
import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";



export const UsersTable = pgTable('usersTable', {
    id: uuid('id').primaryKey().defaultRandom(),
    username: varchar('username', { length: 250 }).notNull(),
    email: varchar('email', { length: 400 }).notNull().unique(),
    password: varchar('password', { length: 60 }).notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().notNull()
});


export const contentType = pgEnum('contentType', ['Twitter', 'Youtube', 'Instagram', 'Other']);

export const ContentTable = pgTable("contentTable", {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 100 }).notNull(),
    description: varchar('description', { length: 1000 }),
    link: varchar('link', { length: 1000 }).notNull(),
    type: contentType().default('Other').notNull(),
    tags: varchar('tags', { length: 50 }).array(),
    userId: uuid('userId').references(() => UsersTable.id, { onDelete: "cascade" }).notNull()
})


export const tagsTable = pgTable('tagsTable', { // for vector search
    id: uuid("id").primaryKey().defaultRandom(),
    tags: varchar('tags', { length: 60 }).notNull().unique()
})

export const LinkTable = pgTable('linkTable', {
    id: uuid('id').primaryKey().defaultRandom(),
    linkhash: varchar('linkhash', { length: 60 }).notNull(),
    userId: uuid('userId').notNull().references(() => UsersTable.id, { onDelete: 'cascade' }).unique()
})


export const UsersRelation = relations(UsersTable, ({ one, many }) => {
    return {
        userContent: many(ContentTable),
        userLink: one(LinkTable)
    }
})

export const ContentRelation = relations(ContentTable, ({ one }) => {
    return {
        user: one(UsersTable, {
            fields: [ContentTable.userId],
            references: [UsersTable.id]
        })
    }
})

export const LinkRelation = relations(LinkTable, ({ one }) => {
    return {
        user: one(UsersTable, {
            fields: [LinkTable.userId],
            references: [UsersTable.id]
        })
    }
})