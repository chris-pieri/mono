import { Route } from '@angular/router';
import { AddRecipe, EditRecipe, Home } from '@mono/frontend/tissi';

export const appRoutes: Route[] = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'add-recipe',
    component: AddRecipe,
  },
  {
    path: 'edit-recipe/:id',
    component: EditRecipe,
  },
  {
    path: '*',
    redirectTo: '',
  },
];
