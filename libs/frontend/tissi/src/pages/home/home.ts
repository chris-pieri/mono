import { Component, inject, OnInit, signal } from '@angular/core';
import { AddRecipe } from '../../components/add-recipe/add-recipe';
import {
  GoldenLayout,
  Button,
  Card,
  List,
  ListItemCheckbox,
  ThemeSwitcher,
  GoldenLayoutService,
} from '@mono/frontend/ui';
import { RecipesService } from '../../services/recipes.service';
import { ListService } from '../../services/list.service';
import { CommonModule } from '@angular/common';
import { IngredientService } from '../../services/ingredients.service';

@Component({
  selector: 'lib-home',
  imports: [
    AddRecipe,
    GoldenLayout,
    Button,
    Card,
    List,
    ListItemCheckbox,
    ThemeSwitcher,
    CommonModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private recipesService = inject(RecipesService);
  private listService = inject(ListService);
  private ingredientsService = inject(IngredientService);
  ingredients = this.ingredientsService.ingredients;
  recipes = this.recipesService.recipes;
  list = this.listService.list;

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
