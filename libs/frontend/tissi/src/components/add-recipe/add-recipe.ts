import { Component, inject, model, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Input, Select, Button, Overlay } from '@mono/ui';

@Component({
  selector: 'lib-add-recipe',
  imports: [Input, Select, ReactiveFormsModule, Button, Overlay],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.css',
})
export class AddRecipe implements OnInit {
  isOverlayOpen = model(false);
  protected readonly unitOptions = [
    'grams',
    'ml',
    'cups',
    'tsp',
    'tbsp',
    'pieces',
  ];
  private ingredientId = signal(0);
  private formBuilder = inject(FormBuilder);

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
    recipeName: new FormControl(''),

    ingredients: this.formBuilder.array([this.createIngredientFormGroup()]),
  });

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.createIngredientFormGroup());
  }

  ngOnInit(): void {
    this.recipeForm.controls.recipeName.valueChanges.subscribe((value) => {
      console.log('Recipe Name:', value);
    });
    // this.recipeForm.controls.ingredientUnit.valueChanges.subscribe((value) => {
    //   console.log('Ingredient Unit:', value);
    // });
    // this.recipeForm.controls.ingredientQuantity.valueChanges.subscribe(
    //   (value) => {
    //     console.log('Quantity:', value);
    //   }
    // );
    // this.recipeForm.controls.ingredientName.valueChanges.subscribe((value) => {
    //   console.log('Ingredient Name:', value);
    // });
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  submit() {
    console.log('Recipe Submitted:', this.recipeForm.value);
  }

  resetForm() {
    this.recipeForm.reset();
    this.ingredients.clear();
    this.ingredients.push(this.createIngredientFormGroup());
  }
}
