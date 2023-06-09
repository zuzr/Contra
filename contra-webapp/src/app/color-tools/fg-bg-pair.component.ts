import { Component, ElementRef, ViewChild } from '@angular/core';
import { ColorPicker } from './color-picker.component';
import { Color, ColorEvent } from 'ngx-color';

@Component({
  selector: 'fg-bg-pair',
  templateUrl: './fg-bg-pair.component.html',
  styleUrls: ['./fg-bg-pair.component.scss']
})
export class FgBgPairComponent {
  @ViewChild('foreground') foreground!: Color;
  @ViewChild('background') background!: Color;
}
