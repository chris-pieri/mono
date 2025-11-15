import 'dotenv/config';
import { betterAuth, BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './src/schemas';
import { magicLink } from 'better-auth/plugins';

const nodemailer = require('nodemailer');

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'emmie.raynor@ethereal.email',
    pass: 'S4NhAzAJEZncbcPt4r',
  },
});

const db = drizzle({
  connection: process.env.DATABASE_URL || '',
  schema,
});
export const betterAuthConfig: BetterAuthOptions = {
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // const link = `http://localhost:4200/api/auth/verify-email?token=${token}&callbackURL=/home`;
      await transporter.sendMail({
        to: user.email,
        subject: 'Verify your email address',
        // text: `Click the link to verify your email: ${url}`,
        html: `
         <p>Click this <a href="${url}">link</a> to verify your email   
        `,
      });
    },
  },
  trustedOrigins: ['http://localhost:4200'],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 15 * 60,
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await transporter.sendMail({
          to: email,
          subject: 'Login to Tissi',
          html: `
         <p>Click this <a href="${url}">link</a> to log into Tissi   
        `,
        });
      },
    }),
  ],
};

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: 'pg', usePlural: true }),
  ...betterAuthConfig,
});
