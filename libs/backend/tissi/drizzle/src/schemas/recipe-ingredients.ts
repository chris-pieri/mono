import { tissiSchema } from './schema';
import { primaryKey, uuid } from 'drizzle-orm/pg-core';

export const recipeIngredients = tissiSchema.table(
  'recipe_ingredients',
  {
    recipe_id: uuid(),
    ingredient_id: uuid(),
  },
  (table) => [primaryKey({ columns: [table.recipe_id, table.ingredient_id] })]
);
