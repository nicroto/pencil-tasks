import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent implements OnInit {

  @Input()
  extraClasses: Array<string> = [];

  constructor() { }

  ngOnInit(): void {
  }

  elementClasses(): string {
    let result = ['custom-button'].concat(this.extraClasses);

    return result.join (' ');
  }

}
