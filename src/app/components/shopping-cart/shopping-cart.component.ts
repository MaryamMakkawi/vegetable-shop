import { Component, OnInit } from '@angular/core';
import { update } from '@firebase/database';

import { ColDef, GridApi } from 'ag-grid-community';
import { ICellRendererParams } from 'ag-grid-enterprise';
import { ProductService } from 'src/app/shared/services/product.service';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { ImageComponent } from './image/image.component';
import { ManageQuantityComponent } from './manage-quantity/manage-quantity.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartId!: string;
  items: any[] = [];
  totalPrice: number = 0;
  gridApi!: GridApi;
  columnDefs: ColDef[] = [
    { headerName: '', field: 'product.imageUrl', cellRenderer: ImageComponent },
    { headerName: 'Title', field: 'product.title' },
    {
      headerName: 'Quantity',
      field: 'quantity',
      cellRenderer: ManageQuantityComponent,
    },
    {
      headerName: 'Price',
      cellRenderer: (params: ICellRendererParams) => {
        this.totalPrice += params.data.quantity * params.data.product.price;
        return params.data.product.price * params.data.quantity;
      },
    },
  ];

  constructor(
    public shoppingListService: ShoppingListService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cartId = JSON.stringify(localStorage.getItem('cartId')!);
    if (this.cartId != 'null') {
      this.shoppingListService
        .getItems(this.cartId.slice(1, -1))
        .subscribe((items) => {
          this.items = this.productService.convertData(items);
        });
    }
  }

  clear() {
    this.shoppingListService
      .deleteItems(this.cartId.slice(1, -1))
      .subscribe((s) => {
        console.log(s);
        this.shoppingListService.itemsQuantity = 0;
        this.items = [];
      });
  }

  // TODO totalPrice
  //TODO addToCart + -
  //TODO checkOut
  //TODO    orders
}
