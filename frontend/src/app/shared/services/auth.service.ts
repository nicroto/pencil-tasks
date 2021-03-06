import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IUser } from '../types/user.interface';
import { DB } from '../services/db.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<IUser | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
  }

  signInWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();

    return this.afAuth.signInWithPopup(provider)
    .then((credential) => {
      this.updateUserData(credential.user)
    })
    .catch(error => console.error(error));
  }

  signOut() {
    return this.afAuth.signOut();
  }

  // Sets user data to firestore on login/signup
  private updateUserData(user: any) {
    const userRef = this.afs.collection(DB.COLLECTION.USERS).doc(user.uid);
    const data: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(data, { merge: true });
  }

}
