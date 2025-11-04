import { DB } from '@mono/backend/database';
import {
  ingredients,
  listIngredients,
  listIngredientUnits,
  recipes,
  TissiDB,
} from '@mono/backend/tissi/drizzle';
import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { Recipe } from '@mono/types/tissi';

@Injectable()
export class ListService {
  constructor(@Inject(DB) private db: TissiDB) {}

  // Need to pass selectedRecipes or else there is a circular dependency error
  async calculate(selectedRecipes: Recipe[]) {
    const ingredients = new Map();

    // Insert recipe ingredient into ingredients map
    selectedRecipes.forEach((recipe) => {
      for (const ingredient of recipe.ingredients) {
        if (ingredients.has(ingredient.ingredient_id)) {
          const currentValue = ingredients.get(ingredient.ingredient_id);
          ingredients.set(ingredient.ingredient_id, [
            ...currentValue,
            ingredient,
          ]);
        } else {
          ingredients.set(ingredient.ingredient_id, [ingredient]);
        }
      }
    });

    await this.db.delete(listIngredients);
    await this.db.delete(listIngredientUnits);

    await this.db
      .insert(listIngredients)
      .values(
        Array.from(ingredients.keys()).map((id) => ({ ingredient_id: id }))
      )
      .onConflictDoNothing();

    const ingredientUnits = Array.from(ingredients.values()).flat();

    await this.db.insert(listIngredientUnits).values(ingredientUnits);
    // Delete all list ingredients that don't exists anymore
  }

  get() {
    return this.db
      .select({
        ingredient_id: listIngredients.ingredient_id,
        name: ingredients.name,
        checked: listIngredients.checked,
        units: sql`
          JSON_AGG(JSON_BUILD_OBJECT(
              'recipe_id', ${recipes.recipe_id},
              'recipe_name', ${recipes.name},
              'quantity', ${listIngredientUnits.quantity},
              'unit', ${listIngredientUnits.unit}
          ))
          `,
      })
      .from(listIngredients)
      .innerJoin(
        ingredients,
        eq(listIngredients.ingredient_id, ingredients.ingredient_id)
      )
      .innerJoin(
        listIngredientUnits,
        eq(ingredients.ingredient_id, listIngredientUnits.ingredient_id)
      )
      .innerJoin(recipes, eq(recipes.recipe_id, listIngredientUnits.recipe_id))
      .groupBy(listIngredients.ingredient_id, ingredients.name);
  }

  check(id: string) {
    return this.db
      .update(listIngredients)
      .set({ checked: true })
      .where(eq(listIngredients.ingredient_id, id));
  }

  uncheck(id: string) {
    return this.db
      .update(listIngredients)
      .set({ checked: false })
      .where(eq(listIngredients.ingredient_id, id));
  }
}
