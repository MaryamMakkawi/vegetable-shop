import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userData!: { user: User; isAdmin: boolean };
  items!: any[];
  cartId!: string;
  constructor(
    private auth: AuthService,
    private route: Router,
    public shoppingListService: ShoppingListService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.cartId = localStorage.getItem('cartId')!;
    this.userData = JSON.parse(localStorage.getItem('user')!);
    if (this.cartId != 'null') {
      this.shoppingListService.getItems(this.cartId).subscribe((items) => {
        this.items = this.productService.convertData(items);
        this.shoppingListService.itemsQuantity =
          this.shoppingListService.totalQuantity(this.items);
      });
    }
  }

  logout() {
    this.auth.logout().then((res) => {
      localStorage.removeItem('user');
      localStorage.removeItem('cartId');
      this.route.navigate(['/login']);
    });
  }
}
