import { Component } from '@angular/core';
import { faCopy, faArrowUpArrowDown, faChevronRight } from '@fortawesome/pro-regular-svg-icons';

import 'node_modules/color-contrast-checker/src/color-contrast-checker.js'; //https://www.npmjs.com/package/color-contrast-checker?activeTab=explore
import color_contrast_checker from 'node_modules/color-contrast-checker/src/color-contrast-checker.js';

declare function checkColors(foregroundColor: any, backgroundColor: any): any;

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
  chevronRight = faChevronRight;

  constructor() {
    this.bgColor = "#FFFFFF";
    this.fontColor = "#000000";
    this.contrastCheck = new color_contrast_checker();
    this.contrastResult = "No contrast result"
  }

  public bgColor: string;
  public fontColor: string;
  public contrastCheck: any;
  public contrastResult: string;

  checkContrast(color1: string, color2: string) {
    if (this.contrastCheck.isLevelAAA(color1, color2, 72)) {
      this.contrastResult = "AAA"
    } else if (this.contrastCheck.isLevelAA(color1, color2, 72)) {
      this.contrastResult = "AA"
    } else {
      this.contrastResult = "FAIL"
    }
  }

  // This function enables the "swap" icon button to swap the background and font colors on click.
  swapColors() {
    var tempColor = this.bgColor;
    this.bgColor = this.fontColor;
    this.fontColor = tempColor;
    return;
  }
}
