import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from '../services/users.service';
import { map, Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | RedirectCommand> => {
  const router = inject(Router);

  const isAuthenticated$ = inject(UsersService).isAuthenticated;
  return isAuthenticated$.pipe(
    map((isAuthenticated) => {
      console.log('is valid - ', isAuthenticated);
      if (isAuthenticated) {
        return true;
      } else {
        const authorizePath = router.parseUrl('/authorize');
        return new RedirectCommand(authorizePath);
      }
    })
  );
};
