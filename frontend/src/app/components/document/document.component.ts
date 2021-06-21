import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Document } from '../../shared/types/document.class';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  @Input() document: Document | null = null

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit(): void {
  }

  async onCanvasChange(data: string){
    if (this.document)
      await this.document.updateDocumentData(this.afs, data);
  }
}
