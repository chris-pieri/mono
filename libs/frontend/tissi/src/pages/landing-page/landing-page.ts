import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeSwitcher } from '@mono/frontend/ui';

@Component({
  selector: 'lib-landing-page',
  imports: [ThemeSwitcher],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  private router = inject(Router);

  goToAuthorize() {
    this.router.navigate(['/authorize']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
