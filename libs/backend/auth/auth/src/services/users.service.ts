import { Inject, Injectable } from '@nestjs/common';
import { BETTER_AUTH } from '../constants/auth-tokens';
import type { Auth } from 'better-auth';
import { SignInOptions, SignUpOptions } from '@mono/types/auth';

@Injectable()
export class UsersService {
  constructor(@Inject(BETTER_AUTH) private auth: Auth) {}

  async get() {
    return await this.auth.api.listUserAccounts();
    return null;
  }

  async session(request: Request) {
    return await this.auth.api.getSession({ headers: request.headers });
  }

  async signUp({ email, password, name }: SignUpOptions) {
    return await this.auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
  }

  async signIn({ email, password }: SignInOptions) {
    return await this.auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  }
}
