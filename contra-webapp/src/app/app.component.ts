import { Component } from '@angular/core';
import { faCopy, faArrowUpArrowDown } from '@fortawesome/pro-regular-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'contra-webapp';

  //Icons
  copy = faCopy;
  swap = faArrowUpArrowDown;

  constructor() {
    this.bgColor = "#FFFFFF";
    this.fontColor = "#000000";
  }

  public bgColor: string;
  public fontColor: string;

  swapColors() {
    var tempColor = this.bgColor;
    this.bgColor = this.fontColor;
    this.fontColor = tempColor;
    return;
  }
}
