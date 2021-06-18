import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {

  // color
  public color = new Subject<fabric.Color> ();

  constructor() {}
}
