import * as schema from './schemas';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
export type TissiDB = NodePgDatabase<typeof schema>;
export * from './schemas';
export { default as drizzleConfig } from '../drizzle.config';