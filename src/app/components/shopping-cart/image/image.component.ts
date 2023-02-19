import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-image',
  template: `
    <span class="clear" (click)="deleteItem()">
      <i class="bi bi-cart-x"></i>
    </span>
    <img [src]="params.value" alt="Not Found" />
  `,
  styles: [
    'img{width: 50px; height: 50px ;border-radius: 50%; background-size: cover;}',
    '.clear{  margin-right: 10px; transition: 0.5s; &:hover { .bi-cart-x { color: lightcoral;} }.bi-cart-x {font-size: 25px;  color: red;cursor: pointer;}}',
  ],
})
export class ImageComponent implements OnInit, ICellRendererAngularComp {
  params!: ICellRendererParams;
  cartId!: string;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.cartId = localStorage.getItem('cartId')!;
  }

  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }

  deleteItem() {
    if (this.cartId != 'null') {
      this.shoppingListService
        .deleteItem(this.cartId, this.params.data.id)
        .subscribe();
      this.params.api.applyTransaction({ remove: [this.params.data] });
    }
  }
}
