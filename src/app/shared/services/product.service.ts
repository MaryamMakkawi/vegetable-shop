import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Product } from '../interfaces/product.interface';
import { NotifierService } from './notifier.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private notifierService: NotifierService,
    private angularFireDatabase: AngularFireDatabase
  ) {}

  add(product: Product) {
    if (product) {
      this.angularFireDatabase.list('/products').push(product);
      this.notifierService.successNotification('success added Product.');
    } else {
      this.notifierService.errorNotification('Error added Product.');
    }
  }

  get() {
    return this.angularFireDatabase.list('products/').valueChanges();
  }
}
