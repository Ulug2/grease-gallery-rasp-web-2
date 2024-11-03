import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const searchs = pgTable('searchs', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export type SelectSearches = typeof searchs.$inferSelect;
export const insertSearchSchema = createInsertSchema(searchs);

export async function getSearchs(
  search: string,
  offset: number
): Promise<{
  searchs: SelectSearches[];
  newOffset: number | null;
  totalSearchs: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      searchs: await db
        .select()
        .from(searchs)
        .where(ilike(searchs.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalSearchs: 0
    };
  }

  if (offset === null) {
    return { searchs: [], newOffset: null, totalSearchs: 0 };
  }

  let totalSearchs = await db.select({ count: count() }).from(searchs);
  let moreSearchs = await db.select().from(searchs).limit(5).offset(offset);
  let newOffset = moreSearchs.length >= 5 ? offset + 5 : null;

  return {
    searchs: moreSearchs,
    newOffset,
    totalSearchs: totalSearchs[0].count
  };
}

export async function deleteSearchById(id: number) {
  await db.delete(searchs).where(eq(searchs.id, id));
}
