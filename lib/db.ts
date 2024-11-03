import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const searches = pgTable('searches', {
  id: integer('id').primaryKey(),
  machine_id: text('machine_id').notNull(),
  grease_id: text('grease_id').notNull(),
  standard_id: integer('standard_id').notNull(),
  test_id: integer('test_id').notNull(),
  delta_e2000: numeric('delta_e2000').notNull(),
  delta_e76: numeric('delta_e76').notNull()
});

export type SelectSearches = typeof searches.$inferSelect;
export const insertSearcheSchema = createInsertSchema(searches);

export async function getSearches(
  search: number,
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

// export async function deleteSearchById(id: number) {
//   await db.delete(searches).where(eq(searches.id, id));
// }

export async function insertSearchById(search: SelectSearches) {
  await db.insert(searches).values(search);
}

export const standards = pgTable('standard', {
  standard_id: integer('standard_id').primaryKey(),
  rgb_r: integer('rgb_r').notNull(),
  rgb_g: integer('rgb_g').notNull(),
  rgb_b: integer('rgb_b').notNull(),
  cmyk_c: integer('cmyk_c').notNull(),
  cmyk_m: integer('cmyk_m').notNull(),
  cmyk_y: integer('cmyk_y').notNull(),
  cmyk_k: integer('cmyk_k').notNull(),
  hex: text('hex').notNull(),
  cielab_l: numeric('cielab_l').notNull(),
  cielab_a: numeric('cielab_a').notNull(),
  cielab_b: numeric('cielab_b').notNull(),
  lchab_l: numeric('lchab_l').notNull(),
  lchab_c: numeric('lchab_c').notNull(),
  lchab_h: numeric('lchab_h').notNull()
});

export const tests = pgTable('tests', {
  test_id: integer('test_id').primaryKey(),
  rgb_r: integer('rgb_r').notNull(),
  rgb_g: integer('rgb_g').notNull(),
  rgb_b: integer('rgb_b').notNull(),
  cmyk_c: integer('cmyk_c').notNull(),
  cmyk_m: integer('cmyk_m').notNull(),
  cmyk_y: integer('cmyk_y').notNull(),
  cmyk_k: integer('cmyk_k').notNull(),
  hex: text('hex').notNull(),
  cielab_l: numeric('cielab_l').notNull(),
  cielab_a: numeric('cielab_a').notNull(),
  cielab_b: numeric('cielab_b').notNull(),
  lchab_l: numeric('lchab_l').notNull(),
  lchab_c: numeric('lchab_c').notNull(),
  lchab_h: numeric('lchab_h').notNull()
});
