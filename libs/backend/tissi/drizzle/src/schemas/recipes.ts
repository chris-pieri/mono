import { tissiSchema } from './schema';
import { text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const recipes = tissiSchema.table('recipes', {
  recipe_id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  description: text(),
  created_at: timestamp().defaultNow().notNull(),
});
