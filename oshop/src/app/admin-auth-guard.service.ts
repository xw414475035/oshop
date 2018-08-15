import { Injectable } from '@angular/core';
import { CanActivate } from '../../node_modules/@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from '../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<any> {
    return this.auth.appUser$
      .map(appUser => appUser.isAdmin);
  }
}
