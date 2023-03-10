import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user.interface';
import { NotifierService } from 'src/app/shared/services/notifier.service';

import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  cartId!: string;
  items: any[] = [];
  shoppingForm!: FormGroup;
  user: any;
  constructor(
    public shoppingListService: ShoppingListService,
    private productService: ProductService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private router: Router,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.shoppingForm = this.fb.group({
      name: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
    });

    this.cartId = JSON.stringify(localStorage.getItem('cartId')!);
    if (this.cartId != 'null') {
      this.shoppingListService
        .getItems(this.cartId.slice(1, -1))
        .subscribe((items) => {
          this.items = this.productService.convertData(items);
          this.shoppingListService.totalPrice != 0
            ? this.shoppingListService.totalPrice
            : this.items.forEach((item) => {
                this.shoppingListService.totalPrice +=
                  +item.quantity * +item.product.price;
              });
        });
    }

    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  addOrder() {
    let order = {
      datePlaced: new Date().toLocaleString(),
      items: this.items,
      shipping: this.shoppingForm.value,
      user: this.user.user.uid,
    };
    this.orderService.post('/orders', order).subscribe((orderId) => {
      this.router.navigate(['../my-orders']);
      this.shoppingListService.totalPrice = 0;
      this.shoppingListService.itemsQuantity = 0;
      localStorage.removeItem('cartId');
      this.items = [];
      this.notifierService.successNotification('Add new order successfully');
    });
  }
}
