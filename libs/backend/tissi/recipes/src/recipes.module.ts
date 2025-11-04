import { Module } from '@nestjs/common';
import { RecipesController } from './controllers/recipes.controller';
import { RecipesService } from './services/recipes.service';
import { IngredientsService } from './services/ingredients.service';
import { ListService } from './services/list.service';
import { ListController } from './controllers/list.controller';

@Module({
  controllers: [RecipesController, ListController],
  providers: [RecipesService, IngredientsService, ListService],
  exports: [],
})
export class RecipesModule {}
