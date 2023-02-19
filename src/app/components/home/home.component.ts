import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Category } from 'src/app/shared/interfaces/category.interface';
import { Product } from 'src/app/shared/interfaces/product.interface';
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
  items: any[] = [];
  filteredProduct!: Product[];
  cartId!: string;
  active!: number;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private shoppingListService: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartId = JSON.stringify(localStorage.getItem('cartId')!);

    this.categoryService.get().subscribe((category: any) => {
      this.categories = category;
    });

    this.productService
      .getAll()
      .pipe(
        switchMap((productObj: any) => {
          this.products = this.productService.convertData(productObj);
          this.filteredProduct = [...this.products];
          return this.activatedRoute.queryParams;
        })
      )
      .subscribe({
        next: (filter) => {
          if (filter['category']) {
            this.filter(filter['category'], filter['id']);
          } else {
            this.active = -1;
          }
        },
      });

    if (this.cartId != 'null') {
      this.shoppingListService
        .getItems(this.cartId.slice(1, -1))
        .subscribe((items) => {
          this.items = this.productService.convertData(items);

          // search item correct in filter array because error in index
        });
    }
  }

  filter(name: string, i: number) {
    this.active = i;
    this.router.navigate(['/home'], { queryParams: { id: i, category: name } });
    this.filteredProduct = this.products.filter((product) => {
      return product.category.toLowerCase() == name.toLowerCase();
    });
  }

  addToCart(product: Product) {
    this.shoppingListService.getCartId().subscribe((cartKey: any) => {
      this.shoppingListService
        .addFirstItem(product, cartKey)
        .subscribe((itemId: any) => {
          this.shoppingListService.getItems(cartKey).subscribe((items) => {
            this.items = this.productService.convertData(items);
            ++this.shoppingListService.itemsQuantity;
          });
        });
    });
  }

  updateQuantity(product: Product, operation: string) {
    this.shoppingListService
      .getItems(this.cartId.slice(1, -1))
      .subscribe((items: any) => {
        const productExist = this.shoppingListService.checkProductExist(
          items,
          product
        );

        this.shoppingListService
          .updateQuantity(
            this.cartId.slice(1, -1),
            product,
            productExist,
            operation
          )
          .subscribe((item: any) => {
            this.items.forEach((ele) => {
              if (productExist.id == ele.id) {
                if (item.quantity != 0) {
                  ele.quantity = item.quantity;
                } else {
                  // TODO icons X for delete
                  this.shoppingListService
                    .deleteItem(this.cartId.slice(1, -1), ele.id)
                    .subscribe((item) => {
                      const indexItem = this.items.indexOf(ele);
                      this.items.splice(indexItem, 1);
                    });
                }
              }
            });
          });
      });
  }
}
