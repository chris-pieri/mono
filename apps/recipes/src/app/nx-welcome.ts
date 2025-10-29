import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Button,
  GoldenLayout,
  GoldenLayoutService,
  Overlay,
  Card,
  List,
  ListItem,
  ListItemCheckbox,
} from '@recipes/ui';

@Component({
  selector: 'app-nx-welcome',
  imports: [
    CommonModule,
    Button,
    GoldenLayout,
    Overlay,
    Card,
    List,
    ListItem,
    ListItemCheckbox,
  ],
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
      <div main-body class="flex flex-wrap gap-4 p-4">
        <lib-card title="Sample Recipe" description="This is a sample recipe">
          <img
            card-image
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
          <ng-container card-actions>
            <lib-button color="secondary" variant="soft">
              View Recipe
            </lib-button>
            <lib-button color="primary" variant="outline"
              >Add to List</lib-button
            >
          </ng-container>
        </lib-card>
        <lib-card title="Another Recipe" description="This is another recipe">
          <img
            card-image
            src="https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg"
            alt="Shoes"
          />
        </lib-card>
      </div>
      <div right-sidebar-header>
        <lib-button (clicked)="toggleRightSidebar()">List</lib-button>
      </div>
      <div right-sidebar-body>
        <lib-list title="Staples">
          <lib-list-item-checkbox title="Eggs" description="12x">
          </lib-list-item-checkbox>
          <lib-list-item-checkbox
            title="Milk"
            [(selected)]="checkboxSelected"
          ></lib-list-item-checkbox>
        </lib-list>
      </div>
    </lib-golden-layout>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {
  isOverlayOpen = signal(false);
  checkboxSelected = signal(true);

  layoutService = inject(GoldenLayoutService);

  toggleRightSidebar() {
    this.layoutService.toggleRightSidebar();
  }

  openOverlay() {
    this.isOverlayOpen.set(true);
    this.checkboxSelected.set(true);
  }
}
