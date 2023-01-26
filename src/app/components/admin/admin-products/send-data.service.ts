import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class SendDataService {
 private product!:Product;
  constructor() {}

  sendDataProduct(product: Product) {
    this.product= product;
  }

  receiveDataProduct() {
    return this.product
  }

}
