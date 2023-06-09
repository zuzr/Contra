import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ColorChromeModule } from 'ngx-color/chrome';
import { ColorPicker } from './color-tools/color-picker.component'
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { ClipboardModule } from 'ngx-clipboard'; //https://www.npmjs.com/package/ngx-clipboard

// add applications specific icons. see: https://github.com/FortAwesome/angular-fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FgBgPairComponent } from './color-tools/fg-bg-pair.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorPicker,
    FgBgPairComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    ColorChromeModule,
    ClipboardModule,
    FontAwesomeModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
