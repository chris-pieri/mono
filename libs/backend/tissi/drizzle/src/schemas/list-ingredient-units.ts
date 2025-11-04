import { ingredients } from './ingredients';
import { recipes } from './recipes';
import { tissiSchema } from './schema';
import { decimal, text, unique, uuid } from 'drizzle-orm/pg-core';

export const listIngredientUnits = tissiSchema.table(
  'list_ingredients_units',
  {
    id: uuid().defaultRandom().primaryKey(),
    recipe_id: uuid().references(() => recipes.recipe_id),
    ingredient_id: uuid().references(() => ingredients.ingredient_id),
    unit: text().notNull(),
    quantity: decimal().notNull(),
  },
  (t) => [unique().on(t.recipe_id, t.ingredient_id)]
);
