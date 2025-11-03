import { tissiSchema } from './schema';
import { boolean, primaryKey, uuid } from 'drizzle-orm/pg-core';

export const listIngredients = tissiSchema.table(
  'list_ingredients',
  {
    recipe_id: uuid(),
    ingredient_id: uuid(),
    checked: boolean().default(false).notNull(),
  },
  (table) => [primaryKey({ columns: [table.recipe_id, table.ingredient_id] })]
);
