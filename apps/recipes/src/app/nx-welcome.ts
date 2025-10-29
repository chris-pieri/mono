import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Button,
  GoldenLayout,
  GoldenLayoutService,
  Overlay,
  Card,
} from '@recipes/ui';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule, Button, GoldenLayout, Overlay, Card],
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
      <div main-body>
        <lib-card>
          <img
            card-image
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
          <span card-title>Delicious Recipe</span>
          <!-- <span card-description>
            This is a brief description of a delicious recipe that you can try
            at home.
          </span> -->
          <ng-container card-actions>
            <lib-button color="secondary" variant="soft">
              View Recipe
            </lib-button>
            <lib-button color="primary" variant="outline"
              >Add to List</lib-button
            >
          </ng-container>
        </lib-card>
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
