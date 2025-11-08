import { Route } from '@angular/router';
import {
  AddRecipe,
  EditRecipe,
  Home,
  LandingPage,
  ViewRecipe,
} from '@mono/frontend/tissi';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'home',
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
