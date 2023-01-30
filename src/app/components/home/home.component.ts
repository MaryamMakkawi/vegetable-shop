import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Category } from 'src/app/shared/interfaces/category.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { shoppingList } from 'src/app/shared/interfaces/shoppingList.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories!: Category[];
  products!: Product[];
  filteredProduct!: Product[];
  active!: number;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private ShoppingListService: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.get().subscribe((category: any) => {
      this.categories = category;
    });

    this.productService
      .getAll()
      .pipe(
        switchMap((product: any) => {
          this.products = this.productService.convertData(product);
          this.filteredProduct = [...this.products];
          console.log(this.filteredProduct);
          console.log(this.products);
          return this.activatedRoute.queryParams;
        })
      )
      .subscribe((filter) => {
        if (filter['category']) {
          this.filter(filter['category'], filter['id']);
        } else {
          this.active = -1;
        }
      });
  }

  filter(name: string, i: number) {
    this.active = i;
    this.router.navigate(['/home'], { queryParams: { id: i, category: name } });

    this.filteredProduct = this.products.filter((product) => {
      return product.category.toLowerCase() == name.toLowerCase();
    });
  }

  addToCart() {

  }
}
