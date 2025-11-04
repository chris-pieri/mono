import { ingredients } from './ingredients';
import { tissiSchema } from './schema';
import { boolean, uuid } from 'drizzle-orm/pg-core';

export const listIngredients = tissiSchema.table('list_ingredients', {
  ingredient_id: uuid()
    .primaryKey()
    .references(() => ingredients.ingredient_id),
  checked: boolean().default(false).notNull(),
});
