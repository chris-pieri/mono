import { relations } from 'drizzle-orm';
import { tissiSchema } from './schema';
import { decimal, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { recipes } from './recipes';
import { ingredients } from './ingredients';

export const recipeIngredients = tissiSchema.table(
  'recipe_ingredients',
  {
    recipe_id: uuid(),
    ingredient_id: uuid(),
    quantity: decimal(),
    unit: text(),
  },
  (table) => [primaryKey({ columns: [table.recipe_id, table.ingredient_id] })]
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
