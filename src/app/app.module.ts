import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

// import { HighlightModule } from 'ngx-highlightjs';
import { HighlightModule } from '../../projects/ngx-highlightjs/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HighlightModule,
    FormsModule,
    MaterialModule,
    TextFieldModule,
    FlexLayoutModule,
    NgScrollbarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
