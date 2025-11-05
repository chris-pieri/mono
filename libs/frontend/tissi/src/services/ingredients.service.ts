import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  ingredients = httpResource(() => `http://localhost:3000/api/ingredients`);
}
