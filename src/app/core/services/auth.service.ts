import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService{

  constructor(private afAuth: AngularFireAuth,private route:Router) {}

  OAuthProvider(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((user) => {
       console.log(user);
       this.route.navigate(['/home']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  SignInWithGoogle() {
    return this.OAuthProvider(new auth.GoogleAuthProvider());
  }

}
