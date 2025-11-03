import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecipesService } from '../services/recipes.service';
import { type Recipe, type NewRecipe } from '@mono/types/tissi';

@Controller('recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  getRecipes(): Promise<Recipe[]> {
    return this.recipesService.get();
  }

  @Post()
  async createRecipe(@Body() recipe: NewRecipe): Promise<Recipe | undefined> {
    return await this.recipesService.create(recipe);
  }
}
