import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { Product } from '../interfaces/product.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  cartId!: string;
  constructor(
    private api: ApiService,
    private productService: ProductService
  ) {}

  // CART
  newCart(data: any) {
    return this.api.post('shoppingList/', data);
  }

  getCartId() {
    this.cartId = JSON.stringify(localStorage.getItem('cartId')!);
    // if not found cart create & add item on click & return cartId else return cartId because found
    if (this.cartId === 'null') {
      // For everyone generate has cartId (add cart)
      return this.newCart({
        createdDate: new Date().getTime(),
      }).pipe(
        switchMap((cartKey: any) => {
          localStorage.setItem('cartId', cartKey.name);

          return new Observable((observer) => {
            observer.next(cartKey.name);
          });
        })
      );
    } else {
      return new Observable((observer) => {
        observer.next(this.cartId.slice(1, -1));
      });
    }
  }

  getCart(id: string) {
    return this.api.get(`shoppingList/${id}`);
  }

  // ITEMS
  addFirstItem(product: Product, id: string) {
    return this.api.post(`shoppingList/${id}/items`, {
      product,
      quantity: 1,
    });
  }
  updateQuantity(
    id: string,
    product: Product,
    productExist: any,
    operation: string
  ) {
    if (operation == '+') {
      return this.api.put(`shoppingList/${id}/items/${productExist.id}`, {
        product,
        quantity: productExist.quantity + 1,
      });
    } else {
      return this.api.put(`shoppingList/${id}/items/${productExist.id}`, {
        product,
        quantity: productExist.quantity - 1,
      });
    }
  }

  getItems(id: string) {
    return this.api.get(`shoppingList/${id}/items`);
  }

  DeleteItem(cartId: string, itemId: string) {
    return this.api.delete(`shoppingList/${cartId}/items/${itemId}`);
  }

  checkProductExist(items: any, product: Product) {
    const itemsConvert = this.productService.convertData(items);
    const exist = itemsConvert.find(
      (productItems: any) => productItems.product.id == product.id
    );
    return exist;
  }

}
