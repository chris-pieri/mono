import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button, Card } from '@mono/frontend/ui';

@Component({
  selector: 'lib-check-email',
  imports: [Button, Card],
  templateUrl: './check-email.html',
  styleUrl: './check-email.css',
})
export class CheckEmail {
  router = inject(Router);

  goBack() {
    this.router.navigate(['/sign-in']);
  }
}
