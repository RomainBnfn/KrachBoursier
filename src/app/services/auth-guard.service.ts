import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
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
    let ret = false;
    let user = this.authService.user;

    switch (route.routeConfig?.path) {
      // Need to be authenticated
      case 'admin':
      case 'view':
        if (this.authService.isAllowed(user)) {
          ret = true;
        }
        break;

      // Not needed
      case '':
        ret = true;
        break;
    }
    return ret;
  }
}
