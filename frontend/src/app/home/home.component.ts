import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DocumentService } from '../shared/services/document.service';
import { Document } from '../shared/types/document.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedDocumentSubscription: Subscription;

  selectedDocument: Document | null = null;

  constructor(documentService: DocumentService) {
    this.selectedDocumentSubscription = documentService.selectedDocument.subscribe(newDocument => {
      this.selectedDocument = newDocument;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectedDocumentSubscription.unsubscribe();
  }

  private isDocumentSelected(): boolean {
    return this.selectedDocument != null;
  }

}
