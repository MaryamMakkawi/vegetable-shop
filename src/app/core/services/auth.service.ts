import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from './user.service';
import { NotifierService } from 'src/app/shared/services/notifier.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  addUser!: any;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private user: UserService,
    private notifierService: NotifierService,
    private productService: ProductService
  ) {}

  OAuthProvider(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((newUser: any) => {
        const userGoogle = {
          user: newUser.user.multiFactor.user,
          isAdmin: true,
        };

        this.user.getAll().subscribe((users) => {
          const userSearch = this.productService.convertData(users);
          this.addUser = userSearch.find((user: any) => {
            return userGoogle.user.uid === user.user.uid;
          });

          if (this.addUser === undefined) {
            this.user.add(userGoogle).subscribe((userId) => {});
          }
        });
        localStorage.setItem('user', JSON.stringify(userGoogle));
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  SignInWithGoogle() {
    this.OAuthProvider(new auth.GoogleAuthProvider());
  }

  SignIn(name:string,email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        const user = {
          uid: res.user.multiFactor.user.uid,
          displayName: name,
          email: email,
          password: password,
        };
        localStorage.setItem('user', JSON.stringify({ user, isAdmin: true }));
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(name: string, email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res: any) => {
        const user = {
          uid: res.user.multiFactor.user.uid,
          displayName: name,
          email: email,
          password: password,
        };
        this.user.add({ user, isAdmin: true }).subscribe((userId) => {
          this.router.navigate(['/home']);
        });
        this.notifierService.successNotification(
          'You are Successfully signed up!'
        );
        localStorage.setItem('user', JSON.stringify({ user,isAdmin: true }));
      })
      .catch((error) => {
        this.notifierService.errorNotification(
          'Email already exist,Please SignIn'
        );
      });
  }

  logout() {
    localStorage.removeItem('user');
    return this.afAuth.signOut();
  }
}
