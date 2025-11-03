import { tissiSchema } from './schema';
import { text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

export const recipes = tissiSchema.table('recipes', {
  recipe_id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  description: text(),
  selected: boolean().default(false).notNull(),
  created_at: timestamp().defaultNow().notNull(),
});
