import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { getAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user$!: Observable<firebase.User| null >
  constructor(private afAuth: AngularFireAuth, private route: Router) {}

  OAuthProvider(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((user) => {
        this.route.navigate(['/home']);
        // this.user$ =this.afAuth.user;
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  SignInWithGoogle() {
    return this.OAuthProvider(new auth.GoogleAuthProvider());
  }

  //TODO userInfo() {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   return user
  // }

  logout() {
    localStorage.removeItem('user');
    return this.afAuth.signOut();
  }
}
