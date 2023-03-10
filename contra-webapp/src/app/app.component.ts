import { Component, ViewEncapsulation } from '@angular/core';
import { faCopy, faArrowUpArrowDown, faChevronRight, faArrowRightArrowLeft } from '@fortawesome/pro-regular-svg-icons';

// Generated ts declaration files with: https://github.com/Microsoft/dts-gen
import 'node_modules/color-contrast-checker/src/color-contrast-checker.js'; //https://www.npmjs.com/package/color-contrast-checker?activeTab=explore
import color_contrast_checker from 'node_modules/color-contrast-checker/src/color-contrast-checker.js';

declare function checkColors(foregroundColor: any, backgroundColor: any): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent {
  title = 'contra-webapp';

  //Icons
  copy = faCopy;
  swapVertical = faArrowUpArrowDown;
  swapHorizontal = faArrowRightArrowLeft;
  chevronRight = faChevronRight;

  constructor(

  ) {
    this.bgColor = "#FFFFFF";
    this.fontColor = "#000000";
    this.contrastCheck = new color_contrast_checker();
    this.contrastResult = "No contrast result";

    // For ColorMind API
    /* this.url = "http://colormind.io/api/";
    this.http = new XMLHttpRequest(); */
  }

  public bgColor: string;
  public fontColor: string;
  public contrastCheck: any;
  public contrastResult: string;

  // For ColorMind API
  /* public url: string;
  public http: XMLHttpRequest; */

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
  swapColors(color1: string, color2: string) {
    var tempColor: string = color1;
    color1 = this.fontColor;
    color2 = tempColor;
    return;
  }

  // For ColorMind API
  /* getColors() {
    let colorData: { [model: string]: [input: [r: number, g: number, b:number]] } = {};
    colorData.['default'] = [[44,43,44],[90,83,82],"N","N","N"]
  }

  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
      var palette = JSON.parse(http.responseText).result;
    }
  }

  http.open("POST", url, true);
  http.send(JSON.stringify(data)); */
}
