import { Component, OnInit } from '@angular/core';

import { Order } from 'src/app/shared/interfaces/order.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.get('/orders/').subscribe((orders: any) => {
      this.orders = this.productService.convertData(orders);
    });
  }
}
