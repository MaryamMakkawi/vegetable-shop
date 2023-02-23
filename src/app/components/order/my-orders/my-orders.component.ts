import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { OrderService } from 'src/app/shared/services/order.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  orders: Order[]=[];
  userId!: string;
  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')!).user.uid;
    this.orderService.get('/orders/').subscribe((orders: any) => {
      this.productService.convertData(orders).map((myOrder: any) => {
        myOrder.user == this.userId
          ? (this.orders.push(myOrder))
          : (this.orders =this.orders);
      });
    });
  }
}
