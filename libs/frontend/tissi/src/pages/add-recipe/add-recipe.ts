import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { NewRecipe, RecipeIngredient } from '@mono/types/tissi';
import { Button, Select, Input } from '@mono/frontend/ui';
import { Router } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'lib-add-recipe',
  imports: [Input, Select, ReactiveFormsModule, Button],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.css',
})
export class AddRecipe {
  protected readonly unitOptions = [
    'grams',
    'ml',
    'cups',
    'tsp',
    'tbsp',
    'pieces',
    'lbs',
  ];
  private ingredientId = signal(0);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private recipesService = inject(RecipesService);

  private createIngredientFormGroup() {
    this.ingredientId.update((id) => id + 1);
    return this.formBuilder.group({
      id: new FormControl(this.ingredientId()),
      ingredientName: new FormControl(''),
      ingredientQuantity: new FormControl(1),
      ingredientUnit: new FormControl('grams'),
    });
  }

  recipeForm = this.formBuilder.group({
    recipeName: ['', Validators.required],

    ingredients: this.formBuilder.array([this.createIngredientFormGroup()]),
  });

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.createIngredientFormGroup());
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  submit() {
    console.log('Recipe Submitted:', this.recipeForm.value);
    const { recipeName, ingredients } = this.recipeForm.value;
    if (!recipeName || !ingredients) {
      return;
    }
    // Fields could be undefined
    const mappedIngredients: RecipeIngredient[] = ingredients.map((i) => ({
      name: i.ingredientName,
      quantity: i.ingredientQuantity,
      unit: i.ingredientUnit,
    })) as RecipeIngredient[];
    const newRecipe: NewRecipe = {
      name: recipeName,
      ingredients: mappedIngredients,
    };
    this.recipesService.create(newRecipe).subscribe({
      next: () => {
        this.goBack();
      },
    });
  }
}
