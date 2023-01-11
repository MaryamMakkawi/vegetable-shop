import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any;
  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  logout() {
    this.auth.logout().then((res) => {
      localStorage.removeItem('user');
      this.route.navigate(['/login']);
    });
  }
}
