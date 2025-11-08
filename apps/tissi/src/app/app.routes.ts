import { Route } from '@angular/router';
import { AddRecipe, EditRecipe, Home, ViewRecipe } from '@mono/frontend/tissi';

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
    path: 'recipe/:id',
    component: ViewRecipe,
  },
  {
    path: '*',
    redirectTo: '',
  },
];
