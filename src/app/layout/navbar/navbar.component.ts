import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userData: any;
  isAdmin: boolean = false;

  constructor(
    private auth: AuthService,
    private route: Router,
    private user: UserService
  ) {}

  async ngOnInit() {
    this.userData = await this.user.onReadUser(this.user.userUid());
    this.isAdmin = this.userData.isAdmin == 'true';
  }

  logout() {
    this.auth.logout().then((res) => {
      localStorage.removeItem('user');
      this.route.navigate(['/login']);
    });
  }
}
