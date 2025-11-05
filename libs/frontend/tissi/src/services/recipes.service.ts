import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { NewRecipe, Recipe } from '@mono/types/tissi';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  httpClient = inject(HttpClient);
  recipes = httpResource<Recipe[]>(() => `http://localhost:3000/api/recipes`, {
    defaultValue: [],
  });

  create(recipe: NewRecipe) {
    return this.httpClient
      .post<Recipe>('http://localhost:3000/api/recipes', recipe)
      .pipe(tap((r) => this.recipes.update((recipes) => [...recipes, r])));
  }

  private toggleRecipeSelection(id: string) {
    this.recipes.update((recipes) => {
      return recipes.map((r) =>
        r.recipe_id === id ? { ...r, selected: !r.selected } : r
      );
    });
  }

  select(id: string): Observable<void> {
    this.toggleRecipeSelection(id);
    return this.httpClient
      .post<void>(`http://localhost:3000/api/recipes/select/${id}`, {})
      .pipe(
        catchError((err) => {
          this.toggleRecipeSelection(id);
          return throwError(() => err);
        })
      );
  }

  deselect(id: string): Observable<void> {
    this.toggleRecipeSelection(id);
    return this.httpClient
      .post<void>(`http://localhost:3000/api/recipes/deselect/${id}`, {})
      .pipe(
        catchError((err) => {
          this.toggleRecipeSelection(id);
          return throwError(() => err);
        })
      );
  }
}
