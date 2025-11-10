import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: 'libs/backend/auth/src/migrations',
  schema: 'libs/backend/auth/src/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
});
