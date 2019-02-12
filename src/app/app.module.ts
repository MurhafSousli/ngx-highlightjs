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

import { HighlightModule } from 'ngx-highlightjs';

import typescript from 'highlight.js/lib/languages/typescript';
import scss from 'highlight.js/lib/languages/scss';
import xml from 'highlight.js/lib/languages/xml';
import shell from 'highlight.js/lib/languages/shell';

export function highlightLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'scss', func: scss},
    {name: 'xml', func: xml},
    {name: 'shell', func: shell}
  ];
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HighlightModule.forRoot({
      languages: highlightLanguages
    }),
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
