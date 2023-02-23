import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  orderId!: string;
  order!: Order;
  totalPrice: number = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.params['id'];
    this.orderService.get(`orders/${this.orderId}`).subscribe((order: any) => {
      this.order = order;
      console.log(order);
      this.order.items.forEach((order) => {
        this.totalPrice += order.quantity * order.product.price;
      });
    });
  }
}
