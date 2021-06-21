import { Component, OnInit, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { fabric } from 'fabric';
import { DrawingService } from '../shared/services/drawing.service';
import { Document } from '../shared/types/document.class';

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.scss']
})
export class DrawingCanvasComponent implements OnInit {

  private _canvas?: fabric.Canvas;
  private _objectAdded: (evt: fabric.IEvent) => void;
  private _objectModified: (evt: fabric.IEvent) => void;
  private _pauseEventEmits: boolean = false;
  private colorChangeSubscription: Subscription;


  @Input() dataJson: string = ""
  @Output() change = new EventEmitter<string>();


  constructor(
    private zone: NgZone,
    private drawing: DrawingService
  )
  {
    this._objectAdded = (evt: fabric.IEvent) => this.__onChange(evt);
    this._objectModified = (evt: fabric.IEvent) => this.__onChange(evt);

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

      this._canvas.on('object:added', this._objectAdded);
      this._canvas.on('object:modified', this._objectModified);

      this.drawing.color.next(new fabric.Color("#000000"));

      this.loadDataFromDocument();
    });
  }

  ngOnDestroy(): void {
    this.colorChangeSubscription.unsubscribe();
  }

  private __onChange(evt: fabric.IEvent): void {
    if (this._canvas && !this._pauseEventEmits) {
      let jsonObject: any = this._canvas.toJSON();

      // the signature of the method is wrong - it returns a JSON-serializable object and not a string
      this.change.emit(JSON.stringify(jsonObject));
    }
  }

  private loadDataFromDocument(): void {
    if (this._canvas && this.dataJson) {
      this._pauseEventEmits = true;

      this._canvas.loadFromJSON(this.dataJson,() => {

        this._pauseEventEmits = false;
      });
    }
  }

}
