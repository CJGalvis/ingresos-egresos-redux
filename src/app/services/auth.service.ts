import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubscription: Subscription;
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.userSubscription = this.firestore
          .doc(`${fuser.uid}/user`)
          .valueChanges()
          .subscribe((data) => {
            const tempUser = User.userFromJson(data);
            this.store.dispatch(setUser({ user: tempUser }));
          });
      } else {
        this.userSubscription?.unsubscribe();
        this.store.dispatch(unSetUser());
      }
    });
  }

  createUser(username: string, email: string, password: string) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((fuser) => {
        const newUser = new User(fuser.user.uid, email, username);
        return this.firestore.doc(`${fuser.user.uid}/user`).set({ ...newUser });
      });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fuser) => fuser != null));
  }
}
