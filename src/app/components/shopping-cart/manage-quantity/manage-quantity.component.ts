import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: '',
  template: `
    <div class="quantity">
      <button
        class="btn btn-primary"
        (click)="updateQuantity('+')"
        [disabled]="loading"
      >
        +
      </button>
      <span>{{ quantity }}</span>
      <button
        class="btn btn-primary"
        *ngIf="quantity !== 1"
        (click)="updateQuantity('-')"
        [disabled]="loading"
      >
        -
      </button>
    </div>
  `,
  styles: ['.quantity{display:block;}', 'span{margin:0 10px 0 10px;}'],
})
export class ManageQuantityComponent
  implements OnInit, ICellRendererAngularComp
{
  params!: ICellRendererParams;
  cartId!: string;
  quantity!: number;
  loading!: boolean;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.cartId = localStorage.getItem('cartId')!;
  }

  agInit(params: ICellRendererParams<any, any>) {
    this.params = params;
    this.quantity = this.params.data.quantity;
  }
  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }

  updateQuantity(operation: string) {
    this.loading = true;
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
          operation === '+'
            ? ++this.shoppingListService.itemsQuantity
            : --this.shoppingListService.itemsQuantity;
          this.loading = false;
        });
    }
  }
}
