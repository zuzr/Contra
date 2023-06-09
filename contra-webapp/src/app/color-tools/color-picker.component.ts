import { Component, Input } from '@angular/core';
import { Color, ColorEvent } from 'ngx-color';
import { ChangeContext } from '@angular-slider/ngx-slider';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})

export class ColorPicker {

  constructor() {
    this.options = {
      ceil: 100,
      floor: 0
    };
  }

  @Input()
  public options;
  public state = { h: 0, s: 1, l: 1, a: 1 };
  public lightness = 100;

  handlePickerChangeComplete($event: ColorEvent) {
    this.state = $event.color.hsl;
    this
    this.lightness = Math.floor(this.state.l * 100);
  }

  handleSliderChange(changeContext: ChangeContext) {
    let newState = Object.create(this.state);
    newState.l = changeContext.value;
    this.state = newState;
  }

}
