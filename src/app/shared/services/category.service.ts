import { Injectable } from '@angular/core';

import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private api: ApiService) {}

  get() {
    return this.api.get('categories/');
  }
}
