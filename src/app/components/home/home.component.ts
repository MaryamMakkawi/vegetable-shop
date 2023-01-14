import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // currentUser = JSON.parse(localStorage.getItem('user')!);

  constructor(private user: UserService) {}

  ngOnInit(): void {
    // if (this.currentUser) {
    //   this.user.onSet(this.currentUser);
    // }
  }
}
