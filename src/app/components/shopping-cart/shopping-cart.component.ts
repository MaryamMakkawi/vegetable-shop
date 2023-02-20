import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
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
  gridApi!: GridApi;
  gridOptions: GridOptions = {
    columnDefs: [
      {
        headerName: '',
        field: 'product.imageUrl',
        cellRenderer: ImageComponent,
      },
      { headerName: 'Title', field: 'product.title' },
      {
        headerName: 'Quantity',
        field: 'quantity',
        cellRenderer: ManageQuantityComponent,
      },
      {
        headerName: 'Price',
        cellRenderer: (params: any) => {
          return params.data.quantity * params.data.product.price;
        },
      },
    ],
    animateRows: true,
  };

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
          this.gridApi?.setRowData(this.items);
          this.shoppingListService.totalPrice = 0;
          this.getAllRowData();
        });
    }
  }

  getAllRowData() {
    this.gridApi?.forEachNode((node: any) => {
      this.shoppingListService.totalPrice +=
        +node.data.quantity * +node.data.product.price;
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  clear() {
    this.shoppingListService
      .deleteItems(this.cartId.slice(1, -1))
      .subscribe((data) => {
        this.shoppingListService.itemsQuantity = 0;
        this.items = [];
        this.gridApi?.setRowData(this.items);
        this.shoppingListService.totalPrice = 0;
      });
  }
  //TODO checkOut
  //TODO orders
}
