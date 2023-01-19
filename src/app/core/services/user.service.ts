import { Injectable } from '@angular/core';

import { get, ref, set } from '@angular/fire/database';
import { getDatabase } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  db = getDatabase();
  urlRef = ref(this.db, 'users');

  constructor() {}

  add(user: any) {
    if (user.user) {
      set(ref(this.db, 'users/' + user.user.uid), {
        displayName: user.user.displayName,
        email: user.user.email,
        photoURL: user.user.photoURL,
        uid: user.user.uid,
        isAdmin: true,
      });
    }
  }

  get(uid: any) {
    const refOneUser = ref(this.db, 'users/' + uid);
    return get(refOneUser).then((data) => {
      return data.val();
    });
  }

  getId() {
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    return currentUser.user.uid;
  }
}

// get(this.urlRef)
//   .then((snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
//   // changes'
//   onValue(this.urlRef, (snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
//   });

// }
// //set add and update on found data
// //push only add data new found or not
// onSet() {
//   set(ref(this.db, 'users/' + 1), {
//     username: 's',
//     email: 's',
//     profile_picture: 'vgd',
//   });
// }

//   db = getDatabase();
//   urlRef = ref(this.db, '/usersg9HHhVWL9AaWGyFIHMziyG0WiJa2');
// onDelete(){
//   remove(this.urlRef).then(() => {
//     console.log("location removed");
//   });
// }
