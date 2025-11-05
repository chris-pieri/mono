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
import { IngredientsService } from './ingredients.service';
import { ListService } from './list.service';

@Injectable()
export class RecipesService {
  constructor(
    @Inject(DB) private db: TissiDB,
    private ingredientsService: IngredientsService,
    private listService: ListService
  ) {}

  private getRecipeQuery() {
    return this.db
      .select({
        ...getTableColumns(recipes),
        ingredients: sql<RecipeIngredient[]>`
        JSON_AGG(JSON_BUILD_OBJECT(
            'recipe_id', ${recipes.recipe_id},
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

  async getSelected(): Promise<Recipe[]> {
    return await this.getRecipeQuery().where(eq(recipes.selected, true));
  }

  async create(recipe: NewRecipe): Promise<Recipe | undefined> {
    const createdRecipe = await this.db.transaction(async (tx) => {
      const createdRecipes = await tx
        .insert(recipes)
        .values(recipe)
        .returning();
      const createdRecipe = createdRecipes.at(0);

      // Pass transaction
      const newIngredients = await this.ingredientsService.create(
        recipe.ingredients.map((i) => ({ name: i.name }))
      );

      // Assign Ids to missing ingredients
      const mappedIngredients = recipe.ingredients.map((ingredient) => {
        const newIngredient = newIngredients.find(
          (i) => i.name === ingredient.name
        );
        return {
          ...ingredient,
          recipe_id: createdRecipe?.recipe_id,
          ingredient_id: newIngredient?.ingredient_id,
        };
      });

      await tx.insert(recipeIngredients).values(mappedIngredients);

      return createdRecipe;
    });

    return await this.getId(createdRecipe?.recipe_id || '');
  }

  async update(recipe: Recipe): Promise<Recipe | undefined> {
    await this.db.transaction(async (tx) => {
      await tx.update(recipes).set(recipe);

      // Pass transaction
      const newIngredients = await this.ingredientsService.create(
        recipe.ingredients.map((i) => ({ name: i.name }))
      );

      await this.db
        .delete(recipeIngredients)
        .where(eq(recipeIngredients.recipe_id, recipe.recipe_id));

      // Assign Ids to missing ingredients
      const mappedIngredients = recipe.ingredients.map((ingredient) => {
        const newIngredient = newIngredients.find(
          (i) => i.name === ingredient.name
        );
        return {
          ...ingredient,
          recipe_id: recipe.recipe_id,
          ingredient_id: newIngredient?.ingredient_id,
        };
      });

      await tx.insert(recipeIngredients).values(mappedIngredients);
    });

    return await this.getId(recipe.recipe_id);
  }

  async delete(id: string) {
    return await this.db.delete(recipes).where(eq(recipes.recipe_id, id));
    // Calculate list if it was selected
  }

  async select(id: string) {
    await this.db
      .update(recipes)
      .set({ selected: true })
      .where(eq(recipes.recipe_id, id));

    const selectedRecipes = await this.getSelected();
    await this.listService.calculate(selectedRecipes);
  }

  async deselect(id: string) {
    await this.db
      .update(recipes)
      .set({ selected: false })
      .where(eq(recipes.recipe_id, id));

    const selectedRecipes = await this.getSelected();
    await this.listService.calculate(selectedRecipes);
  }
}
