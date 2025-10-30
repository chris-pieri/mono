import { Component, inject, model, OnInit } from '@angular/core';
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
  private formBuilder = inject(FormBuilder);

  private createIngredientFormGroup() {
    return this.formBuilder.group({
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

  resetForm() {
    this.recipeForm.reset();
    this.ingredients.clear();
    this.ingredients.push(this.createIngredientFormGroup());
  }
}
