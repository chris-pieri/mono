/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';

export const DB = 'DB_CLIENT';

const createDatabaseProvider = (schema: Record<string, any>): Provider => ({
  provide: DB,
  useFactory: () => {
    return drizzle({ connection: process.env.DATABASE_URL, schema });
  },
  inject: [],
});

@Global()
@Module({})
export class DatabaseModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [createDatabaseProvider(options)],
      exports: [DB],
    };
  }
}
