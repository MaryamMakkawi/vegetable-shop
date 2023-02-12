import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartId!: string;
  items: any[] = [];
  constructor(
    private shoppingListService: ShoppingListService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cartId = JSON.stringify(localStorage.getItem('cartId')!);
    if (this.cartId != 'null') {
      this.shoppingListService
        .getItems(this.cartId.slice(1, -1))
        .subscribe((items) => {
          this.items = this.productService.convertData(items);
          console.log(items);
        });
    }
  }
}
