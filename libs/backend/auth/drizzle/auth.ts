import 'dotenv/config';
import { betterAuth, BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle({ connection: process.env.DATABASE_URL || '' });

export const betterAuthConfig: BetterAuthOptions = {
  emailAndPassword: {
    enabled: true,
  },
};

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', usePlural: true }),
  ...betterAuthConfig,
});
