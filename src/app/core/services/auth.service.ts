import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user$!: Observable<firebase.User| null >
  constructor(
    private afAuth: AngularFireAuth,
    private route: Router,
    private user: UserService
  ) {}

  OAuthProvider(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((user) => {
        this.user.onSet(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.route.navigate(['/home']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  SignInWithGoogle() {
    return this.OAuthProvider(new auth.GoogleAuthProvider());
  }

  logout() {
    localStorage.removeItem('user');
    return this.afAuth.signOut();
  }
}
