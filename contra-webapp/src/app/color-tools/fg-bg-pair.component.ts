import { Component, ElementRef, ViewChild } from '@angular/core';
import { ColorPicker } from './color-picker.component';
import { Color, ColorEvent } from 'ngx-color';

const c = require('color');

@Component({
  selector: 'fg-bg-pair',
  templateUrl: './fg-bg-pair.component.html',
  styleUrls: ['./fg-bg-pair.component.scss']
})

export class FgBgPairComponent {
  @ViewChild('foreground') foreground!: ColorPicker;
  @ViewChild('background') background!: ColorPicker;
  public contrast: number = 0.0;

  private convert = require('color-convert');

  calculateTargetLightness(originPicker: number, fromPicker: boolean) {
    // update current fg/bg contrast
    this.contrast = this.wcagContrast();

    // identify modified picker vs other
    let origin;
    let other;

    if (originPicker == 0) {
      //foreground origin
      origin = {...this.foreground.state};
      other = {...this.background.state};
    } else {
      //background origin
      other = {...this.foreground.state};
      origin = {...this.background.state};
    }

    // calculate contrast for all 0-100 lightness,
    // find upper or lower bound(s) when contrast is or is no longer fulfilled
    var ranges: number[][] = [];
    var lowerLimit = -1;
    var upperLimit = -1;
    for (let i = 0; i <= 1; i+=0.01) {
      let otherColor = other;
      otherColor.l = i;
      let contrast = this.wcagContrast(originPicker, otherColor);
      console.log(contrast);
      // console.log(contrast + ", " + i);
      if(contrast > 3.5) {
        // if good contrast:
        // define first instance as lowerLimit
        if (lowerLimit == -1) {
          lowerLimit = other.l;
        }
        // define upperLimit until we can't anymore
        upperLimit = other.l;
      }
      if (contrast < 3.5 && lowerLimit != -1 && upperLimit != -1) {
        // current range ending
        // add as a range, reset limits
        ranges[0] = [lowerLimit, upperLimit];
        lowerLimit = -1;
        upperLimit = -1;
      }
    }
    if (lowerLimit != -1) {
      ranges[1] = [Math.min(lowerLimit, 0.99), upperLimit];
    }

    if (originPicker == 1) {
      this.foreground.ranges = ranges;
    } else {
      this.background.ranges = ranges;
    }

    console.log(this.foreground.state);
    console.log(this.background.state);
  }

  hslToHex(c: {h: number, s: number, l: number}) {
    return this.convert.hsl.hex([c.h, c.s*100, c.l*100]);
  }

  // calc WCAG ratio using color.contrast()
  wcagContrast(origin: number = -1, other: {h: number, s: number, l: number} = {h:0,s:0,l:0}) {
    let fg = this.hslToHex(this.foreground.state);
    let bg = this.hslToHex(this.background.state);
    if (origin === 0) {
      bg = this.hslToHex(other);
    } else if (origin === 1) {
      fg = this.hslToHex(other);
    }
    return c("#"+fg).contrast(c("#"+bg));
  }
}
