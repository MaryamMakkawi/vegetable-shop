import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formSign!: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formSign = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  handelControl(control: string) {
    return this.formSign.get(control);
  }
  handelErrors(control: string) {
    return this.formSign.get(control)?.errors!;
  }

  googleLogin() {
    this.auth.SignInWithGoogle();
  }

  signUp() {
    this.auth.signUp(
      this.formSign.value.name,
      this.formSign.value.email,
      this.formSign.value.password
    );
  }

  signIn() {
    this.auth.SignIn(
      this.formSign.value.name,
      this.formSign.value.email,
      this.formSign.value.password
    );
  }
}
