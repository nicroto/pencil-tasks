import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { IDBDocument } from './db-document.interface';

export class Document {

  data = new Subject<string>()

  private _dbDocument: IDBDocument
  private _dbRef: DocumentReference<IDBDocument>

  private _isSending: boolean = false

  static async create(
    afs: AngularFirestore,
    owners: Array<string>,
    data: string = ""
  )
  {
    const docData: IDBDocument = {
      data: data,
      owners: owners
    };
    let dbRef: any = null;

    await afs.collection<IDBDocument>('documents').add(docData)
      .then(ref => {
        dbRef = ref;
      });

    return new Document(docData, dbRef as DocumentReference<IDBDocument>);
  }

  constructor(
    dbDocument: IDBDocument,
    dbRef: DocumentReference<IDBDocument>
  )
  {
    this._dbDocument = dbDocument;
    this._dbRef = dbRef;

    this.data.next (dbDocument.data);
  }

  getData(): string {
    return this._dbDocument.data;
  }

  async updateDocumentData(
    afs: AngularFirestore,
    data: string
  )
  {
    let currentDoc = {
      data: data,
      owners: this._dbDocument.owners
    } as IDBDocument;

    // set new doc
    this._dbDocument = currentDoc;

    if (this._isSending) {
      return;
    }

    this._isSending = true;

    this._dbRef.update({...currentDoc})
      .then(() => {
        this._isSending = false;

        // before our request has finished - there has been another update
        if (this._dbDocument !== currentDoc) {
          // call the function on a timeout so we don't add onto the call stack

          setTimeout(() => {this.updateDocumentData(afs, this._dbDocument.data)}, 0);
        }
      });
  }

}
