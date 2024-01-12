import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  email: varchar('email', { length: 100 }).unique(),
  password: varchar('password', { length: 256 }).notNull(),
  phoneNo: varchar('phoneNo', { length: 20 }).notNull().unique(),
});

export type NewUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
