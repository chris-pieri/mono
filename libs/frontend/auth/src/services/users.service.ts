import { inject, Injectable, resource, signal } from '@angular/core';
import { createAuthClient } from 'better-auth/client';
import {
  SignInOptions,
  SignUpOptions,
  User,
  Session,
  MagicLinkSignInOptions,
} from '@mono/types/auth';
import { Router } from '@angular/router';
import { map, skipWhile, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { magicLinkClient } from 'better-auth/client/plugins';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private auth = createAuthClient({
    baseURL: `${API_URL}/auth`,
    plugins: [magicLinkClient()],
  });
  private router = inject(Router);

  private session = resource({
    loader: async (): Promise<{ user: User; session: Session } | null> => {
      const { data, error } = await this.auth.getSession();
      if (error) {
        throw Error(error.message);
      }
      this._user.set(data?.user ?? null);
      return data;
    },
  });

  private sessionValue$ = toObservable(this.session.value);

  isAuthenticated = toObservable(this.session.status).pipe(
    skipWhile((status) => status !== 'resolved'),
    switchMap(() => this.sessionValue$),
    map((session) => {
      if (!session?.session.expiresAt) {
        return false;
      }
      return Boolean(session.session.expiresAt > new Date());
    })
  );

  private _user = signal<User | null>(null);
  get user() {
    return this._user.asReadonly;
  }

  async signUp({ email, password, name }: SignUpOptions) {
    const { data, error } = await this.auth.signUp.email({
      email, // user email address
      password, // user password -> min 8 characters by default
      name, // user display name
    });
    if (error) {
      throw Error(error.message);
    } else {
      await this.auth.sendVerificationEmail({ email });
      this.session.reload();
      // Need timeout because reload doesn't enter reload state immediately
      setTimeout(() => this.router.navigate(['/home']), 1);
    }
  }

  async signInMagicLink({ email, name }: MagicLinkSignInOptions) {
    const { data, error } = await this.auth.signIn.magicLink({
      email,
      name,
      callbackURL: '/home',
      newUserCallbackURL: '/home',
      errorCallbackURL: '/error',
    });
    if (error) {
      throw Error(error.message);
    }
  }

  async signIn({ email, password }: SignInOptions) {
    const { data, error } = await this.auth.signIn.email({
      email,
      password,
      rememberMe: false,
    });
    if (error) {
      if (error.status === 403) {
        await this.auth.sendVerificationEmail({
          email,
          callbackURL: '/home',
        });
      }
      throw Error(error.message);
    } else {
      this.session.reload();
      // Need timeout because reload doesn't enter reload state immediately
      setTimeout(() => this.router.navigate(['/home']), 1);
    }
  }

  async signOut() {
    await this.auth.signOut();
    this.session.reload();
    this.router.navigate(['/sign-in']);
  }
}
