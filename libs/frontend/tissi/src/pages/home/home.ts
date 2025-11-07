import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  GoldenLayout,
  Button,
  Card,
  List,
  ListItemCheckbox,
  ThemeSwitcher,
  GoldenLayoutService,
  Dropdown,
  DropdownItem,
  Overlay,
} from '@mono/frontend/ui';
import { RecipesService } from '../../services/recipes.service';
import { ListService } from '../../services/list.service';
import { CommonModule } from '@angular/common';
import { IngredientService } from '../../services/ingredients.service';
import { Router } from '@angular/router';
import { Recipe } from '@mono/types/tissi';

@Component({
  selector: 'lib-home',
  imports: [
    GoldenLayout,
    Button,
    Card,
    List,
    ListItemCheckbox,
    ThemeSwitcher,
    CommonModule,
    Dropdown,
    Overlay,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private recipesService = inject(RecipesService);
  private listService = inject(ListService);
  private ingredientsService = inject(IngredientService);
  private router = inject(Router);
  ingredients = this.ingredientsService.ingredients;
  recipes = this.recipesService.recipes;
  list = this.listService.list;

  isOverlayOpen = signal(false);
  checkboxSelected = signal(true);

  layoutService = inject(GoldenLayoutService);

  recipeToDelete = signal<Recipe | null>(null);
  showDeleteOverlay = computed(() => Boolean(this.recipeToDelete()));

  cancelDelete() {
    this.recipeToDelete.set(null);
  }

  deleteRecipe() {
    const id = this.recipeToDelete()?.recipe_id;
    if (id) {
      this.recipesService.delete(id).subscribe({
        next: () => this.recipeToDelete.set(null),
      });
    }
  }

  protected readonly cardActions: DropdownItem[] = [
    {
      label: 'Edit',
      action: (recipe: Recipe) => console.log('edit clicked on', recipe),
    },
    {
      label: 'Delete',
      action: (recipe: Recipe) => {
        this.recipeToDelete.set(recipe);
        console.log('delete clicked on ', recipe);
      },
    },
  ];

  toggleRightSidebar() {
    this.layoutService.toggleRightSidebar();
  }

  openOverlay() {
    this.router.navigate(['/add-recipe']);
    // this.isOverlayOpen.set(true);
    // this.checkboxSelected.set(true);
  }

  createRecipe(form: any) {
    this.recipesService.create(form).subscribe({
      next: () => {
        this.isOverlayOpen.set(false);
      },
    });
  }

  selectRecipe(id: string) {
    this.recipesService.select(id).subscribe({
      next: () => this.list.reload(),
    });
  }

  deselectRecipe(id: string) {
    this.recipesService.deselect(id).subscribe({
      next: () => {
        this.list.reload();
      },
    });
  }

  toggleListItem(item: any) {
    if (item.checked) {
      this.listService.uncheck(item.ingredient_id).subscribe();
    } else {
      this.listService.check(item.ingredient_id).subscribe();
    }
  }
}
