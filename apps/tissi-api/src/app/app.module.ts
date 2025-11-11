import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from '@mono/backend/tissi/recipes';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AUTH_DB } from '@mono/backend/auth';
import { DatabaseModule } from '@mono/backend/database';
import { betterAuth } from 'better-auth/*';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { AuthModule } from '@thallesp/nestjs-better-auth';

import { auth } from '@mono/backend/auth/drizzle';
const migrationsFolder = 'libs/backend/auth/drizzle/src/migrations';

@Module({
  imports: [
    // DatabaseModule.register({
    //   database_url: process.env.DATABASE_URL || '',
    //   schema,
    //   migrationsFolder,
    //   token: AUTH_DB,
    // }),
    // AuthModule.forRootAsync({
    //   inject: [AUTH_DB],
    //   useFactory: (database: schema.AuthDB) => {
    //     console.log('database - ', database);
    //     const auth = betterAuth({
    //       database: drizzleAdapter(database, {
    //         provider: 'pg',
    //         usePlural: true,
    //       }),
    //       ...schema.betterAuthConfig,
    //     });
    //     return { auth };
    //   },
    // }),
    AuthModule.forRoot({ auth }),
    RecipesModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'dist', 'apps', 'tissi', 'browser'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
