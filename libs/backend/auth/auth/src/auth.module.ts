import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from '@mono/backend/database';
import * as schema from '@mono/backend/auth/drizzle';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { BETTER_AUTH, AUTH_DB } from './constants/auth-tokens';

const migrationsFolder = 'libs/backend/auth/drizzle/src/migrations';

const createAuthProvider: Provider = {
  provide: BETTER_AUTH,
  useFactory: (database: schema.AuthDB) => {
    return betterAuth({
      database: drizzleAdapter(database, { provider: 'pg', usePlural: true }),
      ...schema.betterAuthConfig,
    });
  },
  inject: [AUTH_DB],
};

@Module({
  imports: [
    DatabaseModule.register({
      database_url: process.env.DATABASE_URL || '',
      schema,
      migrationsFolder,
      token: AUTH_DB,
    }),
  ],
  controllers: [UsersController],
  providers: [createAuthProvider, UsersService],
  exports: [],
})
export class AuthModule {}
