import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from '@mono/backend/tissi/recipes';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from '@mono/backend/users';


@Module({
  imports: [
    UsersModule,
    RecipesModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'dist', 'apps', 'tissi', 'browser'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
