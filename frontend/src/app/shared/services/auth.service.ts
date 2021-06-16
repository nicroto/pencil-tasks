import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user$ = this.setUserData(user);
        this.router.navigateByUrl('home');
      } else {
        this.router.navigateByUrl('signin');
      }
      console.log (`onAuthStateChanged -> User: ${user}`);
    });
  }

  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  private setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(userData, {
      merge: true
    });
  }
}
