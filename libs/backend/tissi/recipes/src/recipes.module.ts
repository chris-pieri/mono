import { Module } from '@nestjs/common';
import { RecipesController } from './controllers/recipes.controller';
import { RecipesService } from './services/recipes.service';
import { IngredientsService } from './services/ingredients.service';
import { ListService } from './services/list.service';
import { ListController } from './controllers/list.controller';
import { IngredientsController } from './controllers/ingredients.controller';

@Module({
  controllers: [RecipesController, ListController, IngredientsController],
  providers: [RecipesService, IngredientsService, ListService],
  exports: [],
})
export class RecipesModule {}
