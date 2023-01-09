import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  googleLogin() {
    this.auth.SignInWithGoogle()
      .then((res) => {
        console.log(`Successfully logged in!`);

      })
      .catch((error) => {
        console.log(error);
      });


  }
}
