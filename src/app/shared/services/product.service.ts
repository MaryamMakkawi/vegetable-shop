import { Injectable } from '@angular/core';

import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private api: ApiService) {}

  add(product: Product) {
    return this.api.post('products', product);
  }

  update(id: string, product: Product) {
    return this.api.put(`products/${id}`, product);
  }

  delete(id: string) {
    return this.api.delete(`/products/${id}`);
  }

  getAll() {
    return this.api.get('products/');
  }

  get(id: string) {
    return this.api.get(`products/${id}`);
  }

  convertData(data: any) {
    let arrayOfObj: any[] = [];
    if (data) {
      Object.keys(data).forEach((key) =>
        arrayOfObj.push({
          id: key,
          ...data[key],
        })
      );
    }
    return arrayOfObj;
  }
}
