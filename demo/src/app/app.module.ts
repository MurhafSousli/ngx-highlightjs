import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighlightModule } from 'ngx-highlightjs';
// import { HighlightModule } from './highlight';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HighlightModule.forRoot('monokai-sublime'),
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    PerfectScrollbarModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
