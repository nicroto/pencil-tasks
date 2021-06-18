import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { fabric } from 'fabric';
import { AuthService } from './auth.service';
import { Document } from '../types/document';

@Injectable({
  providedIn: 'root'
})
export class ServerSyncService {

  private user: any = null;

  public data = new Subject<string> ();

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  ) {
    this.auth.user.subscribe(user => {
      this.user = user;
    });

    this.data.subscribe(data => {
      if (this.user) {
        this.uploadDoc (data);
      }
    })
  }

  private uploadDoc(data: string) {
    const userRef = this.afs.collection('users').doc(this.user.uid);
    const documentRef = this.afs.collection('documents', ref =>
      ref.where('owner', '==', userRef)
    );
    const doc: Document = {
      data: data,
      version: 0,
      owner: userRef
    };

    return documentRef.set(doc, { merge: true });
  }
}
