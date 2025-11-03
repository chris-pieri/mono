import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from '@mono/backend/tissi/recipes';
import { DatabaseModule } from '@mono/backend/database';
import * as schema from '@mono/backend/tissi/drizzle';

@Module({
  imports: [DatabaseModule.register(schema), RecipesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
