import { Route } from '@angular/router';
import {
  AddRecipe,
  EditRecipe,
  Home,
  LandingPage,
  ViewRecipe,
} from '@mono/frontend/tissi';
import { AuthGuard, SignIn } from '@mono/frontend/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'authorize',
    component: SignIn,
  },
  {
    path: 'home',
    component: Home,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-recipe',
    component: AddRecipe,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-recipe/:id',
    component: EditRecipe,
    canActivate: [AuthGuard],
  },
  {
    path: 'recipe/:id',
    component: ViewRecipe,
    canActivate: [AuthGuard],
  },
  {
    path: '*',
    redirectTo: '',
  },
];
