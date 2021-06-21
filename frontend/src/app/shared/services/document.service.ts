import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentReference
} from '@angular/fire/firestore';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Document } from '../types/document.class';
import { IDBDocument } from '../types/db-document.interface';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  userId: string = "";

  documents = new Array<Document>()

  selectedDocument = new Subject<Document>();

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService
  )
  {
    this.auth.user.subscribe(user => {
      this.userId = user ? user.uid : "";

      if (this.userId) {

        this.afs.collection(
          'documents',
          ref => ref.where('owners', 'array-contains', this.userId)
        ).get().toPromise()
          .then(querySnapshot => {
            return Promise.all(querySnapshot.docs.map(async queryDocumentSnapshot => {
              let dataItem: IDBDocument = await queryDocumentSnapshot.data() as IDBDocument;
              return {doc: dataItem, dbRef: queryDocumentSnapshot.ref};
            }));
          })
          .then(dbDocSpecs => {
            if (dbDocSpecs.length) {
              dbDocSpecs.forEach(docSpec =>
                this.documents.push(
                  new Document(
                    docSpec.doc as IDBDocument,
                    docSpec.dbRef as DocumentReference<IDBDocument>
                  )
                )
              );
              this.selectDocument (this.documents [0]);
            } else {
              Document.create(afs, [this.userId])
                .then(doc => {
                  this.documents.push(doc);
                  this.selectDocument (this.documents [0]);
                });
            }
          });
      }
    });
  }

  selectDocument(doc: Document) {
    this.selectedDocument.next(doc);
  }
}
