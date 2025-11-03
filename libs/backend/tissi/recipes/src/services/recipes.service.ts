import { Inject, Injectable } from '@nestjs/common';
import {
  ingredients,
  recipeIngredients,
  recipes,
  TissiDB,
} from '@mono/backend/tissi/drizzle';
import { eq, getTableColumns, sql } from 'drizzle-orm';
import type { NewRecipe, Recipe, RecipeIngredient } from '@mono/types/tissi';
import { DB } from '@mono/backend/database';

@Injectable()
export class RecipesService {
  constructor(@Inject(DB) private db: TissiDB) {}

  private getRecipeQuery() {
    return this.db
      .select({
        ...getTableColumns(recipes),
        ingredients: sql<RecipeIngredient[]>`
        JSON_AGG(JSON_BUILD_OBJECT(
            'ingredient_id', ${ingredients.ingredient_id},
            'name', ${ingredients.name},
            'quantity', ${recipeIngredients.quantity},
            'unit', ${recipeIngredients.unit}
        ))
        `,
      })
      .from(recipes)
      .innerJoin(
        recipeIngredients,
        eq(recipes.recipe_id, recipeIngredients.recipe_id)
      )
      .innerJoin(
        ingredients,
        eq(recipeIngredients.ingredient_id, ingredients.ingredient_id)
      )
      .groupBy(recipes.recipe_id);
  }

  async get(): Promise<Recipe[]> {
    return await this.getRecipeQuery();
  }

  async getId(id: string): Promise<Recipe | undefined> {
    const recipe = await this.getRecipeQuery().where(eq(recipes.recipe_id, id));
    return recipe.at(0);
  }

  async create(recipe: NewRecipe): Promise<Recipe | undefined> {
    const createdRecipe = await this.db.transaction(async (tx) => {
      const createdRecipes = await tx
        .insert(recipes)
        .values(recipe)
        .returning();
      const createdRecipe = createdRecipes.at(0);

      // Create all ingredients that do not already exist
      const missingIngredients = recipe.ingredients
        .filter((ingredient) => !ingredient.ingredient_id)
        .map((ingredient) => ({
          name: ingredient.name,
        }));

      // Make ingredients unique
      // Create a ingredients service that creates only if not exists
      const newIngredients = await tx
        .insert(ingredients)
        .values(missingIngredients)
        .returning();

      // Assign Ids to missing ingredients
      const mappedIngredients = recipe.ingredients.map((ingredient) => {
        if (ingredient.ingredient_id) {
          return {
            ...ingredient,
            recipe_id: createdRecipe?.recipe_id,
          };
        }
        const newIngredient = newIngredients.find(
          (i) => i.name === ingredient.name
        );
        return {
          ...ingredient,
          recipe_id: createdRecipe?.recipe_id,
          ingredient_id: newIngredient?.ingredient_id,
        };
      });

      console.log('recipeIngredietns', mappedIngredients);

      await tx.insert(recipeIngredients).values(mappedIngredients);

      return createdRecipe;
    });

    console.log(createdRecipe);

    return await this.getId(createdRecipe?.recipe_id || '');
  }

  async delete(id: string) {
    // Add foreign keys and cascade delete
    return this.db.delete(recipes).where(eq(recipes.recipe_id, id));
    // Calculate list
  }
}
