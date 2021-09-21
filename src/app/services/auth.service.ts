import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth;
  user: User | undefined;

  constructor() {
    this.auth = getAuth();
    this.user = undefined;
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
        //onSignIn();
      } else {
        this.user = undefined;
        //onSignOut();
      }
    });
  }

  createAccount(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error ' + errorCode + ' : ' + ' ' + errorMessage);
        // ..
      });
  }

  signIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  signOut() {
    signOut(this.auth);
  }

  public get isAuth(): boolean {
    if (this.user) return true;
    return false;
  }
}
