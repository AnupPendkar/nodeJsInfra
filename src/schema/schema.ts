import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  username: varchar('username', {length: 100}),
  password: varchar('password', {length: 256}),
  phoneNo: varchar('phoneNo', { length: 20 }),
});
