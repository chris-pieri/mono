import { Inject, Injectable } from '@nestjs/common';
import { BETTER_AUTH } from '../constants/auth-tokens';
import type { Auth } from 'better-auth';

@Injectable()
export class UsersService {
  constructor(@Inject(BETTER_AUTH) private auth: Auth) {}

  async get() {
    return await this.auth.api.listUserAccounts();
    return null;
  }

  async signUp() {
    return await this.auth.api.signUpEmail({
      body: {
        email: 'testuser@gmail.com',
        password: 'password',
        name: 'Test User',
      },
    });
  }
}
