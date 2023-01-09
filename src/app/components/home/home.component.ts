import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth) {}
  userData:any
  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        console.log(user);
      } else {
        localStorage.setItem('user', 'null');
      console.log(JSON.parse(localStorage.getItem('user')!));
      }
    });
  }
}

