import {
  Component,
  inject,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Button,
  GoldenLayout,
  GoldenLayoutService,
  Overlay,
} from '@recipes/ui';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule, Button, GoldenLayout, Overlay],
  template: `
    <lib-overlay [(open)]="isOverlayOpen" />
    <lib-golden-layout>
      <div main-header class="flex justify-between w-full">
        <lib-button variant="ghost">
          <i icon-left>+</i>
          Recipes
        </lib-button>

        <lib-button variant="outline" (clicked)="openOverlay()">
          <i icon-left>+</i>
          Add a Recipe
        </lib-button>
      </div>
      <div right-sidebar-header>
        <lib-button (clicked)="toggleRightSidebar()">List</lib-button>
      </div>
      <div right-sidebar-body>
        <p>Right Sidebar Content</p>
      </div>
    </lib-golden-layout>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {
  isOverlayOpen = signal(false);

  layoutService = inject(GoldenLayoutService);

  toggleRightSidebar() {
    this.layoutService.toggleRightSidebar();
  }

  openOverlay() {
    this.isOverlayOpen.set(true);
  }
}
