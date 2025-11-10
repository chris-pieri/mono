/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

export interface DatabaseModuleOptions {
  token: string;
  database_url: string;
  schema: Record<string, any>;
  migrationsFolder?: string;
}

const createDatabaseProvider = (options: DatabaseModuleOptions): Provider => ({
  provide: options.token,
  useFactory: async () => {
    const db = drizzle({
      connection: options.database_url,
      schema: options.schema,
    });
    if (options.migrationsFolder) {
      console.log(`🦆 Migrating Database - ${options.token} ...`);
      await migrate(db, { migrationsFolder: options.migrationsFolder });
      console.log(`✅ Database migrated - ${options.token}`);
    }
    return db;
  },
  inject: [],
});

@Module({})
export class DatabaseModule {
  static register(options: DatabaseModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [createDatabaseProvider(options)],
      exports: [options.token],
    };
  }
}
