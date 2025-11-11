import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button, Card, Input } from '@mono/frontend/ui';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'lib-sign-up',
  imports: [Button, Card, Input, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  private usersService = inject(UsersService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  protected isLoading = signal(false);
  protected errorMessage = signal<string | null>(null);

  protected signInForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    name: ['', Validators.required],
  });

  async onSignIn() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const { email, password, name } = this.signInForm.getRawValue();
      await this.usersService.signUp({ email, password, name });
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

  goBack() {
    this.router.navigate(['']);
  }
}
