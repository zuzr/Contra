import { Component } from '@angular/core';
import { ColorPickerDirective } from 'ngx-color-picker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'contra-webapp';
  constructor() {
    this.bgColor = "#FFFFFF";
    this.fontColor = "#000000";
  }
  public bgColor: string;
  public fontColor: string;
}
