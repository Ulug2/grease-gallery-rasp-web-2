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

export const searches = pgTable('searches', {
  id: numeric('id').primaryKey(),
  machine_id: serial('machine_id').notNull(),
  grease_id: serial('grease_id').notNull(),
  standard_id: numeric('standard_id').notNull(),
  test_id: numeric('test_id').notNull(),
  delta_e2000: numeric('delta_e2000').notNull(),
  delta_e76: numeric('delta_e76').notNull()
});


export type SelectSearches = typeof searches.$inferSelect;
export const insertSearcheSchema = createInsertSchema(searches);

export async function getSearches(
  search: string,
  offset: number
): Promise<{
  searches: SelectSearches[];
  newOffset: number | null;
  totalSearches: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      searches: await db
        .select()
        .from(searches)
        .where(ilike(searches.id, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalSearches: 0
    };
  }

  if (offset === null) {
    return { searches: [], newOffset: null, totalSearches: 0 };
  }

  let totalSearches = await db.select({ count: count() }).from(searches);
  let moreSearches = await db.select().from(searches).limit(5).offset(offset);
  let newOffset = moreSearches.length >= 5 ? offset + 5 : null;

  return {
    searches: moreSearches,
    newOffset,
    totalSearches: totalSearches[0].count
  };
}

export async function deleteSearchById(id: number) {
  await db.delete(searches).where(eq(searches.id, id));
}
