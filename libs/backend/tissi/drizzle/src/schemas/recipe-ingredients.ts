import { relations, sql } from 'drizzle-orm';
import { tissiSchema } from './schema';
import { check, decimal, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { recipes } from './recipes';
import { ingredients } from './ingredients';

export const recipeIngredients = tissiSchema.table(
  'recipe_ingredients',
  {
    recipe_id: uuid().references(() => recipes.recipe_id, {
      onDelete: 'cascade',
    }),
    ingredient_id: uuid().references(() => ingredients.ingredient_id, {
      onDelete: 'cascade',
    }),
    quantity: decimal(),
    unit: text(),
  },
  (table) => [
    primaryKey({ columns: [table.recipe_id, table.ingredient_id] }),
    check('ingredient_quantity_check', sql`${table.quantity} >= 0`),
  ]
);

export const recipeIngredientRelations = relations(
  recipeIngredients,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipeIngredients.recipe_id],
      references: [recipes.recipe_id],
    }),
    ingredient: one(ingredients, {
      fields: [recipeIngredients.ingredient_id],
      references: [ingredients.ingredient_id],
    }),
  })
);
