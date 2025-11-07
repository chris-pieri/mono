import { Route } from '@angular/router';
import { AddRecipe, Home } from '@mono/frontend/tissi';

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
    path: '*',
    redirectTo: '',
  },
];
