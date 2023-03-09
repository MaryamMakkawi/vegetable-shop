import { Component, OnInit } from '@angular/core';

import {  GridApi, GridOptions } from 'ag-grid-community';
import { Subscription } from 'rxjs';

import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ActionCellComponent } from './action-cell/action-cell.component';
import { Router } from '@angular/router';
import { SendDataService } from './send-data.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  products!: any;
  searchText!: string;
  product!: Product;
  subscription!: Subscription;
  cellSelectedData!: Product;
  gridApi!: GridApi;
  gridOptions: GridOptions = {
    columnDefs:[
      { field: 'title' },
      { field: 'imageUrl' },
      { field: 'price' },
      { field: 'category' },
      {
        field: 'Action',
        cellRenderer: ActionCellComponent,
        pinned: 'right',
        width: 120,
      },
    ],
    animateRows: true,
    suppressHorizontalScroll: true,

  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private sendDataService: SendDataService
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe((data) => {
      this.products = this.productService.convertData(data);
    });
  }

  goNewProduct() {
    this.product = { id: '', title: '', price: '', imageUrl: '', category: '' };
    this.router.navigate(['admin/products/new']);
    this.sendDataService.sendDataProduct(this.product);
  }

  onSearch() {
    this.gridApi.setQuickFilter(this.searchText);
  }

  gridReady(params: any) {
    this.gridApi = params.api;

    this.productService.getAll().subscribe((data) => {
      this.products = this.productService.convertData(data);
    });
  }
}
