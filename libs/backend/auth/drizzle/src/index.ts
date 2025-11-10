import * as schema from './schemas';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
export type AuthDB = NodePgDatabase<typeof schema>;
export * from './schemas';
export * from '../auth';
