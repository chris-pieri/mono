import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button, GoldenLayout, GoldenLayoutService } from '@recipes/ui';

@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule, Button, GoldenLayout],
  template: `
    <lib-golden-layout>
      <div main-header class="flex justify-between w-full">
        <lib-button variant="ghost">
          <i icon-left>+</i>
          Recipes
        </lib-button>

        <lib-button variant="outline">
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
  layoutService = inject(GoldenLayoutService);
  toggleRightSidebar() {
    this.layoutService.toggleRightSidebar();
  }
}
