import { Component, OnInit } from '@angular/core';

import { ColDef, GridApi } from 'ag-grid-community';
import { Subscription } from 'rxjs';

import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ActionCellComponent } from './edit-cell/action-cell.component';
import { Router } from '@angular/router';

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
  columnDefs: ColDef[] = [
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
  ];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getAll().subscribe((data) => {
      this.products = this.productService.convertData(data);
    });
  }

  goNewProduct() {
    this.router.navigate(['admin/products/new']);
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
