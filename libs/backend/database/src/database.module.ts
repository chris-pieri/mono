/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

export const DB = 'DB_CLIENT';

export interface DatabaseModuleOptions {
  schema: Record<string, any>;
  migrationsFolder?: string;
}

const createDatabaseProvider = (options: DatabaseModuleOptions): Provider => ({
  provide: DB,
  useFactory: async () => {
    const db = drizzle({ connection: process.env.DATABASE_URL, schema: options.schema });
    if (options.migrationsFolder) {
      console.log('🦆 Migrating Database...');
      await migrate(db, { migrationsFolder: options.migrationsFolder });
      console.log('✅ Database migrated');
    }
    return db;
  },
  inject: [],
});

@Global()
@Module({})
export class DatabaseModule {
  static register(options: DatabaseModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [createDatabaseProvider(options)],
      exports: [DB],
    };
  }
}
