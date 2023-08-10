import {
  integer,
    pgTable,
    serial,
    text,
    timestamp,
    uniqueIndex,
    varchar,
  } from 'drizzle-orm/pg-core'
  import { InferModel } from 'drizzle-orm'
  import { sql } from '@vercel/postgres'
  import { drizzle } from 'drizzle-orm/vercel-postgres'
  
  export const UsersTable = pgTable(
    'cartv1',
    {
      id: serial("id").primaryKey(),
    userid: varchar("userid").notNull(),
    productid: varchar("productid").notNull(),
    title: varchar("title").notNull(),
    price: integer("price").notNull(),
    image: varchar("image").notNull(),
    quantity: integer("quantity").notNull()
    },
    (users) => {
      return {
        uniqueIdx: uniqueIndex('unique_idx').on(users.title),
      }
    }
  )
  
  export type User = InferModel<typeof UsersTable>
  export type NewUser = InferModel<typeof UsersTable, 'insert'>
  
  // Connect to Vercel Postgres
  export const db = drizzle(sql)