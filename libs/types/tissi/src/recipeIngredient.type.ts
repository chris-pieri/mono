import { recipeIngredients } from '@mono/backend/tissi/drizzle';

export type RecipeIngredient = typeof recipeIngredients.$inferSelect & {
  name: string;
};
export type NewRecipeIngredient = typeof recipeIngredients.$inferInsert & {
  name: string;
};
