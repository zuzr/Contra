import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'contra-webapp';
  constructor() {
    this.color = "#FFFFFF";
  }
  public color: string;
}
