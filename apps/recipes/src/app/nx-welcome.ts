import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '@recipes/ui';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule, Button],
  template: `
    <lib-button variant="primary">
      <i ngProjectAs="icon-left">✅</i>
      Hello
    </lib-button>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {}
