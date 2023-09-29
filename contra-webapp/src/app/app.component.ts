import { Component, ViewEncapsulation } from '@angular/core';
import { faCopy, faArrowUpArrowDown, faChevronRight, faArrowRightArrowLeft } from '@fortawesome/pro-regular-svg-icons';

// Generated ts declaration files with: https://github.com/Microsoft/dts-gen


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
    this.bgColors = ["#FFFFFF", "#c6c6c6"];
    this.bgColor1 = "#FFFFFF";
    this.bgColor2 = "#c6c6c6";
    this.fgColors = ["#000000", "#333333"];
    this.headlineColor = "#000000";
    this.bodyColor = "#000000";
    this.contrastResult = "No contrast result";
    this.isLevelAA = true;

    // For ColorMind API
    /* this.url = "http://colormind.io/api/";
    this.http = new XMLHttpRequest(); */
  }

  public bgColors: string[];
  public fgColors: string[];
  public bgColor1: string;
  public bgColor2: string;
  public headlineColor: string;
  public bodyColor: string;
  public contrastCheck: any;
  public contrastResult: string;
  public isLevelAA: boolean;

  // For ColorMind API
  /* public url: string;
  public http: XMLHttpRequest; */

  checkContrast(headlineColor: string, bgColor1: string) {
    if (this.contrastCheck.isLevelAAA(headlineColor, bgColor1, 72)) {
      this.contrastResult = "AAA"
    } else if (this.contrastCheck.isLevelAA(headlineColor, bgColor1, 72)) {
      this.contrastResult = "AA"
    } else {
      this.contrastResult = "FAIL"
    }
  }

  // This function enables the "swap" icon button to swap the background and font colors on click.
  swapColors(color1: string, color2: string) {
    var tempColor: string = color1;
    color1 = this.headlineColor;
    color2 = tempColor;
    return;
  }

  addBgColorInput() {
    if (this.bgColors.length < 4) {
      this.bgColors.push("#FFFFFF");
    } else {
      //
    }
  }

  addFgColorInput() {
    if (this.fgColors.length < 4) {
      this.fgColors.push("#000000");
    } else {
      //
    }
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
