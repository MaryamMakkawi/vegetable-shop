import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: '',
  template: `
    <div class="quantity">
      <button class="btn btn-primary" (click)="updateQuantity('+')">+</button>
      <span>{{ quantity }}</span>
      <button
        class="btn btn-primary"
        *ngIf="visibility"
        (click)="updateQuantity('-')"
      >
        -
      </button>
    </div>
  `,
  styles: ['.quantity{display:block}', 'span{margin:0 10px 0 10px}'],
})
export class ManageQuantityComponent
  implements OnInit, ICellRendererAngularComp
{
  params!: ICellRendererParams;
  cartId!: string;
  quantity!: number;
  visibility: boolean = true;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.cartId = localStorage.getItem('cartId')!;
  }

  agInit(params: ICellRendererParams<any, any>) {
    this.params = params;
    this.quantity = this.params.data.quantity;

    if (this.quantity == 1) {
      this.visibility = !this.visibility;
    }
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

  updateQuantity(operation: string) {
    if (this.cartId != 'null') {
      this.shoppingListService
        .updateQuantity(
          this.cartId,
          this.params.data.product,
          this.params.data,
          operation
        )
        .subscribe((item: any) => {
          this.quantity = item.quantity;
          this.params.data.quantity = item.quantity;
          this.params.api.applyTransaction({ update: [] });

          if (item.quantity == 1) {
            this.visibility = !this.visibility;
          }
        });
    }
  }
}
