import { Injectable } from '@angular/core';

import { get, ref, set } from '@angular/fire/database';
import { getDatabase } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class UserService {
 private userData: any;
  db = getDatabase();
  tasksRef = ref(this.db, 'users');

  constructor() {}

  onSet(user: any) {
    if (user.user) {
      set(ref(this.db, 'users/' + user.user.uid), {
        displayName: `${user.user.displayName}`,
        email: `${user.user.email}`,
        photoURL: `${user.user.photoURL}`,
        isAdmin: 'true',
      });
    }
  }

  onReadUser(uid: any) {
    const refOneUser = ref(this.db, 'users/' + uid);
    return get(refOneUser).then((data) => {
      this.userData = data.val();
      return this.userData;
    });
  }

  userUid() {
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    return currentUser.user.uid;
  }
}

// TODO Add(store) user in fireStore in firebase

// get(this.tasksRef)
//   .then((snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
//   // changes'
//   onValue(this.tasksRef, (snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
//   });

// }

// onSet() {
//   set(ref(this.db, 'users/' + 1), {
//     username: 's',
//     email: 's',
//     profile_picture: 'vgd',
//   });
// }

//   db = getDatabase();
//   tasksRef = ref(this.db, '/usersg9HHhVWL9AaWGyFIHMziyG0WiJa2');
// onDelete(){
//   remove(this.tasksRef).then(() => {
//     console.log("location removed");
//   });
// }
