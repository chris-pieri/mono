import { recipes } from '@mono/backend/tissi/drizzle';
import { RecipeIngredient } from './recipeIngredient.type';

type recipe = typeof recipes.$inferSelect;
type newRecipe = typeof recipes.$inferInsert;

export type Recipe = recipe & {
  ingredients: RecipeIngredient[];
};
export type NewRecipe = newRecipe & { ingredients: RecipeIngredient[] };
