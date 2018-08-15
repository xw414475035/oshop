import { Injectable } from '@angular/core';
import { AngularFireAuth } from '../../node_modules/angularfire2/auth';
import * as firebase from '../../node_modules/firebase';
import { Observable } from '../../node_modules/rxjs';
import { ActivatedRoute } from '../../node_modules/@angular/router';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login() {
    /**to get the original returnUrl, if there are some page which the user using, it will set to the 'go back' page after login
     * otherwise it will set 'home page' to returnUrl
    **/
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // set current returnUrl to returnUrl
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) { return this.userService.get(user.uid); }

        return Observable.of(null);
      });
  }
}


