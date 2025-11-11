import 'dotenv/config';
import { betterAuth, BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './src/schemas';

const db = drizzle({
  connection: process.env.DATABASE_URL || '',
  schema,
});

export const betterAuthConfig: BetterAuthOptions = {
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ['http://localhost:4200'],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 15 * 60,
    },
  },
};

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', usePlural: true }),
  ...betterAuthConfig,
});
