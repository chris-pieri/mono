import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Input, Select } from '@mono/ui';

@Component({
  selector: 'lib-add-recipe',
  imports: [Input, Select, ReactiveFormsModule],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.css',
})
export class AddRecipe implements OnInit {
  protected unitOptions = ['grams', 'ml', 'cups', 'tsp', 'tbsp', 'pieces'];
  formGroup = new FormGroup({
    recipeName: new FormControl(''),
    ingredientName: new FormControl(''),
    ingredientQuantity: new FormControl(1),
    ingredientUnit: new FormControl(''),
  });

  ngOnInit(): void {
    this.formGroup.controls.recipeName.valueChanges.subscribe((value) => {
      console.log('Recipe Name:', value);
    });
    this.formGroup.controls.ingredientUnit.valueChanges.subscribe((value) => {
      console.log('Ingredient Unit:', value);
    });
    this.formGroup.controls.ingredientQuantity.valueChanges.subscribe(
      (value) => {
        console.log('Quantity:', value);
      }
    );
    this.formGroup.controls.ingredientName.valueChanges.subscribe((value) => {
      console.log('Ingredient Name:', value);
    });
  }
}
