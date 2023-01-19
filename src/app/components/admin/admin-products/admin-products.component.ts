import { Component, OnDestroy, OnInit } from '@angular/core';

import { ColDef } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products!: Product[];
  subscription!: Subscription;
  columnDefs: ColDef[] = [
    { field: 'title' },
    { field: 'imageUrl' },
    { field: 'price' },
    { field: 'category' },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.subscription = this.productService
      .get()
      .subscribe((products: any[]) => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
