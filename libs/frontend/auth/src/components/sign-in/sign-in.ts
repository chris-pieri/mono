import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Button } from '@mono/frontend/ui';
import { Input } from '@mono/frontend/ui';
import { Card } from '@mono/frontend/ui';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-sign-in',
  imports: [ReactiveFormsModule, Button, Input, Card],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  private usersService = inject(UsersService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  protected isLoading = signal(false);
  protected errorMessage = signal<string | null>(null);

  protected signInForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  async onSignIn() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const { email, password } = this.signInForm.getRawValue();
      await this.usersService.signIn({ email, password });
      this.router.navigate(['/home']);
    } catch (error) {
      console.log('error resp', error);
      this.errorMessage.set(
        error instanceof Error
          ? error.message
          : 'An error occurred during sign in'
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  async signInMagicLink() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const { email } = this.signInForm.getRawValue();
      await this.usersService.signInMagicLink({ email, name: 'Test User' });
      this.router.navigate(['/check-email']);
    } catch (error) {
      console.log('error resp', error);
      this.errorMessage.set(
        error instanceof Error
          ? error.message
          : 'An error occurred during sign in'
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  signOut() {
    this.usersService.signOut();
  }

  goBack() {
    this.router.navigate(['']);
  }
}
