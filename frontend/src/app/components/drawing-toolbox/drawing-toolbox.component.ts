import { Component, OnInit, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrawingService } from '../../shared/services/drawing.service';
import { fabric } from 'fabric';

@Component({
  selector: 'app-drawing-toolbox',
  templateUrl: './drawing-toolbox.component.html',
  styleUrls: ['./drawing-toolbox.component.scss']
})
export class DrawingToolboxComponent implements OnInit {

  public color: any;
  
  @Output() public clearCanvas = new EventEmitter<void> ();

  private colorChangeSubscription: Subscription;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private drawing: DrawingService
  ) {
    this.colorChangeSubscription = this.drawing.color.subscribe(value => {
      this.color = `#${value.toHex()}`;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.colorChangeSubscription.unsubscribe();
  }

  onColorChanged(value: string): void {
    this.drawing.color.next (new fabric.Color(value));
  }

  onDeleteClick(): void {
    this.clearCanvas.emit();
  }

}
