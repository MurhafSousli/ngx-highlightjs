import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from './material/material.module';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HighlightPlusModule, GIST_OPTIONS } from 'ngx-highlightjs/plus';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GistComponent } from './gist/gist.component';
import { CodeComponent } from './code/code.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GistComponent,
    CodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    NgScrollbarModule,
    HighlightPlusModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        // fullLibraryLoader: () => import('highlight.js'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml')
        }
      }
    },
    {
      provide: GIST_OPTIONS,
      useValue: {
        // clientId:
        // clientSecret:
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
