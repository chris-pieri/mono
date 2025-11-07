import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { NewRecipe, Recipe } from '@mono/types/tissi';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  httpClient = inject(HttpClient);
  recipes = httpResource<Recipe[]>(() => `${API_URL}/recipes`, {
    defaultValue: [],
  });

  create(recipe: NewRecipe) {
    return this.httpClient
      .post<Recipe>(`${API_URL}/recipes`, recipe)
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
      .post<void>(`${API_URL}/recipes/select/${id}`, {})
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
      .post<void>(`${API_URL}/recipes/recipes/deselect/${id}`, {})
      .pipe(
        catchError((err) => {
          this.toggleRecipeSelection(id);
          return throwError(() => err);
        })
      );
  }

  private removeRecipe(id: string) {
    this.recipes.update((recipes) => recipes.filter((r) => r.recipe_id !== id));
  }

  delete(id: string) {
    return this.httpClient
      .delete(`${API_URL}/recipes/recipes/${id}`)
      .pipe(tap(() => this.removeRecipe(id)));
  }
}
