import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private angularFireDatabase: AngularFireDatabase) {}

  get() {
    return this.angularFireDatabase.list('categories/').valueChanges();
  }
}
