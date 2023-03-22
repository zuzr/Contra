import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class ContrastCheckerComponent {
  @Input()
  foregroundColors: string[] = [];
  @Input()
  backgroundColors: string[] = [];
  @Input()
  fontWeight: string = '';
  @Input()
  fontSize: string = '';
  @Output() recommendedColors = new EventEmitter<any>();

  calculateContrast(foreground: string, background: string, size: string): string {
    // Calculate contrast using the foreground, background, font weight, and font size inputs
    let contrast = this.calculateContrastValue(foreground, background, this.fontWeight, this.fontSize, size);

    // Check if the contrast passes the AA or AAA standard
    let passAA = contrast >= 4.5;
    let passAAA = contrast >= 7;

    if (passAA && passAAA) {
      return `AA: ${passAA}, AAA: ${passAAA}`;
    } else {
      // Calculate new foreground and background colors that pass the AA or AAA standard
      let newForeground = foreground;
      let newBackground = background;
      let colorChanged = false;

      while (!passAA || !passAAA) {
        // Modify the saturation and lightness of the foreground or background color
        if (!passAA && !colorChanged) {
          newForeground = this.modifySaturationAndLightness(foreground);
          colorChanged = true;
        } else if (!passAAA && !colorChanged) {
          newBackground = this.modifySaturationAndLightness(background);
          colorChanged = true;
        }

        // Recalculate contrast
        contrast = this.calculateContrastValue(newForeground, newBackground, this.fontWeight, this.fontSize, size);

        // Check if the contrast passes the AA or AAA standard
        passAA = contrast >= 4.5;
        passAAA = contrast >= 7;
      }

      // Emit the recommended colors
      this.recommendedColors.emit({
        foreground: newForeground,
        background: newBackground
      });

      return `AA: ${passAA}, AAA: ${passAAA} (Recommended: Foreground: ${newForeground}, Background: ${newBackground})`;
    }
  }

  calculateContrastValue(foreground: string, background: string, fontWeight: string, fontSize: string, size: string): number {
    // Calculate contrast using the WCAG 2.0 formula
    const colorDiff = this.calculateColorDifference(foreground, background);
    const luminance1 = this.calculateLuminance(foreground);
    const luminance2 = this.calculateLuminance(background);
    const lightest = luminance1 > luminance2 ? luminance1 : luminance2;
    const darkest = luminance1 < luminance2 ? luminance1 : luminance2;
    const contrast = (colorDiff + 0.05) / (darkest + 0.05);

    // Adjust contrast for bold text
    const fontWeightValue = fontWeight === 'bold' ? 1.4 : 1;
    const adjustedContrast = contrast * fontWeightValue;

    // Adjust contrast for font size
    const fontSizeValue = size === 'large' ? 1.2 : 1;
    const adjustedContrastValue = adjustedContrast / fontSizeValue;

    return Math.round(adjustedContrastValue * 10) / 10;
  }

  calculateColorDifference(color1: string, color2: string): number {
    // Calculate color difference using the CIEDE2000 formula
    const rgbColor1 = this.hexToRgb(color1);
    const rgbColor2 = this.hexToRgb(color2);
    
    const labColor1 = this.rgbToLab(rgbColor1);
    const labColor2 = this.rgbToLab(rgbColor2);

    const deltaL = labColor2[0] - labColor1[0];
    const deltaA = labColor2[1] - labColor1[1];
    const deltaB = labColor2[2] - labColor1[2];

    const c1 = Math.sqrt(Math.pow(labColor1[1], 2) + Math.pow(labColor1[2], 2));
    const c2 = Math.sqrt(Math.pow(labColor2[1], 2) + Math.pow(labColor2[2], 2));
    const deltaC = c2 - c1;

    const deltaH = Math.sqrt(Math.pow(deltaA, 2) + Math.pow(deltaB, 2) - Math.pow(deltaC, 2));

    const sl = 1;
    const kc = 1;
    const kh = 1;
    const k1 = 0.045;
    const k2 = 0.015;

    const sc = 1 + k1 * c1;
    const sh = 1 + k2 * c1;

    const deltaE = Math.sqrt(Math.pow(deltaL / (sl * kc), 2) + Math.pow(deltaC / (sc * kc), 2) + Math.pow(deltaH / (sh * kh), 2));

    return deltaE;
  }

  calculateLuminance(color: string): number {
    // Calculate relative luminance using the formula from WCAG 2.0
    const rgbColor = this.hexToRgb(color);
    const srgbColor = rgbColor.map(c => c / 255);
    const gammaCorrected = srgbColor.map(c => {
      if (c <= 0.03928) {
        return c / 12.92;
      } else {
        return Math.pow((c + 0.055) / 1.055, 2.4);
      }
    });

    const luminance = 0.2126 * gammaCorrected[0] + 0.7152 * gammaCorrected[1] + 0.0722 * gammaCorrected[2];

    return luminance;
  }

  modifySaturationAndLightness(color: string): string {
    // Modify the saturation and lightness of the color to increase contrast
    const rgb = this.hexToRgb(color);
    const hsl = this.rgbToHsl(rgb);
    let newSaturation = hsl[1];
    let newLightness = hsl[2];

    if (hsl[1] > 0.2) {
      newSaturation = hsl[1] - 0.1;
    } else {
      newLightness = hsl[2] + 0.1;
    }

    const newRgb = this.hslToRgb([hsl[0], newSaturation, newLightness]);
    return this.rgbToHex(newRgb);
  }

  hslToRgb(hsl: number[]): number[] {
    const h = hsl[0];
    const s = hsl[1];
    const l = hsl[2];

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hueToRgb = (t: number) => {
      if (t < 0) {
        t += 1;
      } else if (t > 1) {
        t -= 1;
      }

      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      } else if (t < 1 / 2) {
        return q;
      } else if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      } else {
        return p;
      }
    };

    const r = hueToRgb(h + 1 / 3);
    const g = hueToRgb(h);
    const b = hueToRgb(h - 1 / 3);

    return [r * 255, g * 255, b * 255];
  }

  rgbToHsl(rgb: number[]): number[] {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h, s;
    const l = (max + min) / 2;

    const d = max - min;
    if (d === 0) {
      h = 0;
    } else if (max === r) {
      h = ((g - b) / d) % 6;
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else if (max === b) {
      h = (r - g) / d + 4;
    }

    h = (h || 0) / 6;

    s = d === 0 ? 0 : l > 0.5 ? d / (2 - max - min) : d / (max + min);

    return [h, s, l];
  }

  rgbToLab(rgb: number[]): number[] {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    const xyz = this.rgbToXyz(rgb);
    const x = xyz[0] / 95.047;
    const y = xyz[1] / 100.0;
    const z = xyz[2] / 108.883;

    const fx = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    const fy = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    const fz = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

    const l = 116 * fy - 16;
    const a = 500 * (fx - fy);
    const bValue = 200 * (fy - fz);

    return [l, a, bValue];
  }

  rgbToXyz(rgb: number[]): number[] {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    const rLinear = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    const gLinear = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    const bLinear = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    const x = rLinear * 0.4124 + gLinear * 0.3576 + bLinear * 0.1805;
    const y = rLinear * 0.2126 + gLinear * 0.7152 + bLinear * 0.0722;
    const z = rLinear * 0.0193 + gLinear * 0.1192 + bLinear * 0.9505;

    return [x * 100, y * 100, z * 100];
  }

  hexToRgb(hex: string): number[] {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);

    return [r, g, b];
  }

  rgbToHex(rgb: number[]): string {
    const componentToHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };

    const red = componentToHex(rgb[0]);
    const green = componentToHex(rgb[1]);
    const blue = componentToHex(rgb[2]);

    return "#" + red + green + blue;
  }
}



/* 
// Non-GPT code
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
  }

  public bgColor: string;
  public fontColor: string;
  public contrastCheck: any;
  public contrastResult: string;

  // Set contrast result given a foreground color and background color at 72pt font
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
}
 */