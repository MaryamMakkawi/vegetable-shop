import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(private api: ApiService) {}

  post(data: any) {
    return this.api.post('shoppingList/', data);
  }

  // For everyone generate has cartId 
  cartId() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.post({
        createdDate: new Date().getTime(),
      }).subscribe((s: any) => {
        localStorage.setItem('cartId', `${s.name}`);
      });
    }
  }
}
