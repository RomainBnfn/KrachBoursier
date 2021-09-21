import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let ret: undefined | boolean = undefined;

    switch (route.routeConfig?.path) {
      // Need to be authenticated
      case 'admin':
      case 'view':
        if (this.authService.isAuth) {
          if (this.authService.user?.email == 'junior@ensc.fr') {
            ret = true;
          }
        }
        break;

      // Not needed
      case '':
        ret = true;
        break;
    }
    if (!ret) {
      ret = false;
    }
    return ret;
  }
}
