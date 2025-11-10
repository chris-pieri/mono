import { Module } from '@nestjs/common';
import { RecipesController } from './controllers/recipes.controller';
import { RecipesService } from './services/recipes.service';
import { IngredientsService } from './services/ingredients.service';
import { ListService } from './services/list.service';
import { ListController } from './controllers/list.controller';
import { IngredientsController } from './controllers/ingredients.controller';
import { DatabaseModule } from '@mono/backend/database';
import * as schema from '@mono/backend/tissi/drizzle';
import { TISSI_DB } from './constants/tissi-tokens';

const migrationsFolder = 'libs/backend/tissi/drizzle/src/migrations';

@Module({
  imports: [
    DatabaseModule.register({
      database_url: process.env.DATABASE_URL || '',
      schema,
      migrationsFolder,
      token: TISSI_DB,
    }),
  ],
  controllers: [RecipesController, ListController, IngredientsController],
  providers: [RecipesService, IngredientsService, ListService],
  exports: [],
})
export class RecipesModule {}
