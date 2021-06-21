import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { fabric } from 'fabric';
import { AuthService } from './auth.service';
import { DocumentUtilsService } from './document-utils.service';
import { IDocument } from '../types/document.interface';

@Injectable({
  providedIn: 'root'
})
export class ServerSyncService {

  // ----> Input flowing data
  public data = new Subject<string> ();

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private documentUtils: DocumentUtilsService
  ) {
  }

  public async syncInitialState(user: any): Promise<string> {
    let localDoc = this.getLocalDocument(user.uid);
    let serverDoc = await this.getServerDocument(user.uid)
    if (this.isServerDocumentOutdated (localDoc, serverDoc)) {
      return this.updateServerDocument (localDoc);
    } else {
      this.preserveLocalDocument (serverDoc);
    }
  }

  private getLocalDocument (uid: string): any {
    let documentString = localStorage.getItem (uid);

    return documentString ? JSON.parse(documentString) : { version: 0 };
  }

  private getServerDocument (): any {

  }

  private isServerDocumentOutdated (): boolean {

  }

  private async updateServerDocument () {

  }

  private preserveLocalDocument (): void {

  }

}
