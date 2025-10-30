import { Component } from '@angular/core';

import { Input, Select } from '@mono/ui';

@Component({
  selector: 'lib-add-recipe',
  imports: [Input, Select],
  templateUrl: './add-recipe.html',
  styleUrl: './add-recipe.css',
})
export class AddRecipe {
  unitOptions = ['grams', 'ml', 'cups', 'tsp', 'tbsp', 'pieces'];
}
