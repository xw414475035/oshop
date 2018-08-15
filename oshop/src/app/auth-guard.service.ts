import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, RouterStateSnapshot } from '../../node_modules/@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(router, state: RouterStateSnapshot) {
    // map is an obseverable method, try to listen the value
    return this.auth.user$.map(user => {
      // if user return value, route can be activated
      if (user) { return true; }
      // if false,the router will go to login to protect page
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }); // The url from which this snapshot was created
      return false;
    });

  }

}

