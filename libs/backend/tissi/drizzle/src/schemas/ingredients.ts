import { tissiSchema } from './schema';
import { text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const ingredients = tissiSchema.table('ingredients', {
  ingredient_id: uuid().defaultRandom().primaryKey(),
  name: text().notNull().unique(),
  created_at: timestamp().defaultNow().notNull(),
});
