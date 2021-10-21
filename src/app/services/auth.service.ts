import { Injectable } from '@angular/core';
import { DataSnapshot } from '@firebase/database';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { Observable } from 'rxjs';
import { FireDatabaseService } from './fire-database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth;
  user: User | undefined;

  allowedUsers: string[] = [];

  constructor(private fireDatabaseService: FireDatabaseService) {
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
    //
    this.fireDatabaseService.listen('allowedUsers', this.updateAllowedUsers);
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

  async signIn(email: string, password: string, onLogin: Function) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.user = user;
        onLogin();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
      });
  }

  signOut() {
    signOut(this.auth);
  }

  updateAllowedUsers = (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    this.allowedUsers = [];
    for (let index in data) {
      this.allowedUsers = [...this.allowedUsers, index];
    }
  };

  public isAllowed(user: User | undefined): boolean {
    if (!user) return false;
    return (
      this.allowedUsers.filter((uid: string) => {
        return user.uid == uid;
      }).length > 0
    );
  }

  public get isAuth(): boolean {
    if (this.user) return true;
    return false;
  }
}
