import { Component, OnInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { fabric } from 'fabric';
import { DrawingService } from '../shared/services/drawing.service';

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.scss']
})
export class DrawingCanvasComponent implements OnInit {

  private _canvas?: fabric.Canvas;

  private _mouseUp: (evt: fabric.IEvent) => void;
  private colorChangeSubscription: Subscription;

  constructor(
    private zone: NgZone,
    private drawing: DrawingService
  ) {

    this._mouseUp = (evt: fabric.IEvent) => this.__onMouseUp(evt);

    this.colorChangeSubscription = this.drawing.color.subscribe(value => {
      if (this._canvas) {
        this._canvas.freeDrawingBrush.color = `#${value.toHex()}`;
      }
    });
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this._canvas = new fabric.Canvas('canvasElement', {
        backgroundColor: '#fbfbfd',
        selection: false,
        preserveObjectStacking: true
      });

      let brush = new fabric.PencilBrush(this._canvas);
      this._canvas.freeDrawingBrush = brush;
      this._canvas.isDrawingMode = true;

      this._canvas.on('mouse:up', this._mouseUp);

      this.drawing.color.next(new fabric.Color("#000000"));
    });
  }

  ngOnDestroy(): void {
    this.colorChangeSubscription.unsubscribe();
  }

  private __onMouseUp(evt: fabric.IEvent): void {
    // console.log (JSON.stringify (this._canvas, null, 4));
    debugger;
  }

}
