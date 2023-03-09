import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService) {}

  add(user: any) {
    return this.api.post(`/users`, user);
  }

  getAll() {
    return this.api.get(`users/`);
  }

  get(uid: any) {
    return this.api.get(`users/${uid}`);
  }

  getId() {
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    if (currentUser.user) {
      return currentUser.user.uid;
    }
  }
}
