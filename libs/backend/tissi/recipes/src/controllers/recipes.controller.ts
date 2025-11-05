import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Put()
  async updateRecipe(@Body() recipe: Recipe): Promise<Recipe | undefined> {
    return await this.recipesService.update(recipe);
  }

  @Delete('/:id')
  async deleteRecipe(@Param('id') id: string) {
    await this.recipesService.delete(id);
  }

  @Post('/select/:id')
  async selectRecipe(@Param('id') id: string) {
    await this.recipesService.select(id);
  }

  @Post('/deselect/:id')
  async deSelectRecipe(@Param('id') id: string) {
    await this.recipesService.deselect(id);
  }
}
