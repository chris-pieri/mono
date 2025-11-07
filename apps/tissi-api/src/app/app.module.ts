import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from '@mono/backend/tissi/recipes';
import { DatabaseModule } from '@mono/backend/database';
import * as schema from '@mono/backend/tissi/drizzle';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const migrationsFolder = 'libs/backend/tissi/drizzle/src/migrations';

@Module({
  imports: [
    DatabaseModule.register({
      schema,
      migrationsFolder,
    }),
    RecipesModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'dist', 'apps', 'tissi', 'browser'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
