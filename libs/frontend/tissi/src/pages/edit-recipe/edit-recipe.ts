import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button, Input, Select } from '@mono/frontend/ui';
import { NewRecipe, Recipe, RecipeIngredient } from '@mono/types/tissi';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'lib-edit-recipe',
  imports: [Button, Input, Select, ReactiveFormsModule],
  templateUrl: './edit-recipe.html',
  styleUrl: './edit-recipe.css',
})
export class EditRecipe {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private recipesService = inject(RecipesService);
  private route = inject(ActivatedRoute);
  recipeId = signal<string | null>(null);
  recipes = this.recipesService.recipes;
  recipe = computed(() => {
    return this.recipes.value().find((r) => r.recipe_id === this.recipeId());
  });

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

  constructor() {
    const recipeId = this.route.snapshot.paramMap.get('id') ?? '';
    this.recipeId.set(recipeId);

    effect(() => {
      this.ingredients.clear();
      this.recipe()?.ingredients.forEach((i) => this.addIngredient(i));
      this.recipeForm.patchValue({
        recipeName: this.recipe()?.name,
      });
    });
  }

  private createIngredientFormGroup(ingredient?: RecipeIngredient) {
    const { ingredient_id, name, quantity, unit } = ingredient ?? {};
    this.ingredientId.update((id) => id + 1);
    return this.formBuilder.group({
      id: new FormControl(ingredient_id || this.ingredientId()),
      ingredientName: new FormControl(name || ''),
      ingredientQuantity: new FormControl(quantity || 1),
      ingredientUnit: new FormControl(unit || 'grams'),
    });
  }

  recipeForm = this.formBuilder.group({
    recipeName: ['', Validators.required],

    ingredients: this.formBuilder.array([this.createIngredientFormGroup()]),
  });

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient(ingredient?: RecipeIngredient) {
    this.ingredients.push(this.createIngredientFormGroup(ingredient));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  submit() {
    console.log('Recipe Submitted:', this.recipeForm.value);
    const { recipeName, ingredients } = this.recipeForm.value;
    if (!recipeName || !ingredients) {
      return;
    }
    // Fields could be undefined
    const mappedIngredients: RecipeIngredient[] = ingredients.map((i) => ({
      ingredient_id: i.id,
      name: i.ingredientName,
      quantity: i.ingredientQuantity,
      unit: i.ingredientUnit,
    })) as RecipeIngredient[];
    const newRecipe: any = {
      ...this.recipe(),
      name: recipeName,
      ingredients: mappedIngredients,
    };
    this.recipesService.update(this.recipeId() || '', newRecipe).subscribe({
      next: () => {
        this.goBack();
      },
    });
  }
}
