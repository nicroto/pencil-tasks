import { Component, OnInit, NgZone } from '@angular/core';
import { fabric } from 'fabric';

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.scss']
})
export class DrawingCanvasComponent implements OnInit {

  private _canvas?: fabric.Canvas;
  private _mouseDown: (evt: fabric.IEvent) => void;
  private _mouseMove: (evt: fabric.IEvent) => void;
  private _mouseUp: (evt: fabric.IEvent) => void;

  constructor(private zone: NgZone) {
    this._mouseDown = (evt: fabric.IEvent) => this.__onMouseDown(evt);
    this._mouseMove = (evt: fabric.IEvent) => this.__onMouseMove(evt);
    this._mouseUp = (evt: fabric.IEvent) => this.__onMouseUp(evt);
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this._canvas = new fabric.Canvas('canvasElement', {
        backgroundColor: '#fbfbfd',
        selection: false,
        preserveObjectStacking: true
      });

      this._canvas.on('mouse:down', this._mouseDown);
      this._canvas.on('mouse:move', this._mouseMove);
      this._canvas.on('mouse:up', this._mouseUp);
    });
  }

  private __onMouseDown(evt: fabric.IEvent): void {
  }
  private __onMouseMove(evt: fabric.IEvent): void {
  }
  private __onMouseUp(evt: fabric.IEvent): void {
  }

}
