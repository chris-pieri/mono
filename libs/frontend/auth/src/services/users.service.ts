import { inject, Injectable, resource, signal } from '@angular/core';
import { createAuthClient } from 'better-auth/client';
import { SignInOptions, SignUpOptions, User, Session } from '@mono/types/auth';
import { Router } from '@angular/router';
import { map, skipWhile, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private auth = createAuthClient({
    baseURL: `${API_URL}/auth`,
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
      this.session.reload();
      // Need timeout because reload doesn't enter reload state immediately
      setTimeout(() => this.router.navigate(['/home']), 1);
    }
  }

  async signIn({ email, password }: SignInOptions) {
    const { data, error } = await this.auth.signIn.email({
      email,
      password,
      rememberMe: false,
    });
    if (error) {
      throw Error(error.message);
    } else {
      this.session.reload();
      // Need timeout because reload doesn't enter reload state immediately
      setTimeout(() => this.router.navigate(['/home']), 1);
    }
  }

  async signOut() {
    const token = this.session.value()?.session.token;
    if (!token) {
      return;
    }
    await this.auth.revokeSession({
      token,
    });
    this.router.navigate(['/authorize']);
  }
}
