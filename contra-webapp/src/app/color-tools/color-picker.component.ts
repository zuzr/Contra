import { Component, Input, Output, EventEmitter } from '@angular/core';
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
      ceil: 1,
      floor: 0,
      step: 0.01,
      hideLimitLabels: true,
      hidePointerLabels: true,
      vertical: true,
      getPointerColor: (value: number): string => {
        return 'gray';
      }
    };
  }

  @Input() public options;
  @Input() public contrast: number = -1.0;
  @Input() public flexDir: string = "row";

  // color picker
  // h: 0-359, s: 0-100, l: 0-100, a: disabled
  // the color picker only updates when the state variable is changed directly
  public state = { h: 0, s: 0.5, l: 0.5, a: 0 };
  // slider value (0-100)
  // this is given to the slider from the picker, and received from the slider on slide
  public lightness = 0.5;
  public ranges: number[][] = [];

  ngAfterViewInit() {
    this.lightness = this.state.l;
    console.log(this.state);
    this.calculateTargetLightness.emit(false);
  }

  handlePickerChangeComplete($event: {h: number, s: number, l: number, a: number}) {
    this.state = $event;
    this.lightness = this.state.l;
    this.calculateTargetLightness.emit(true);
  }

  handleSliderChange(changeContext: ChangeContext) {
    let newState = {...this.state};
    let v = changeContext.value;
    newState.l = v;
    this.state = newState;
    this.calculateTargetLightness.emit(false);
  }

  @Output("calculateTargetLightness") calculateTargetLightness: EventEmitter<any> = new EventEmitter();
}
