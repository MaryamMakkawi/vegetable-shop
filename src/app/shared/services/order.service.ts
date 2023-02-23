import { Injectable } from '@angular/core';

import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private api: ApiService) {}

  post(path: string, shipping: any) {
    return this.api.post(path, shipping);
  }

  get(path: string) {
    return this.api.get(path);
  }

}
