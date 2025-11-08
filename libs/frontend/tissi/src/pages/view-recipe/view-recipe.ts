import { Component, computed, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'lib-view-recipe',
  imports: [],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {
  private router = inject(Router);
  private recipesService = inject(RecipesService);
  private route = inject(ActivatedRoute);
  recipeId = signal<string | null>(null);
  recipes = this.recipesService.recipes;
  recipe = computed(() => {
    return this.recipes.value().find((r) => r.recipe_id === this.recipeId());
  });

  constructor() {
    const recipeId = this.route.snapshot.paramMap.get('id') ?? '';
    this.recipeId.set(recipeId);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
