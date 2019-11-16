import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HighlightModule } from 'ngx-highlightjs';
// Uncomment the following line for development
// import { HighlightModule } from '../../src/public-api';
import { GistFilePipe, GistDirective } from './gist';
import { CodeFromUrlPipe } from './code-from-url';

@NgModule({
  imports: [
    HighlightModule,
    HttpClientModule
  ],
  declarations: [
    GistDirective,
    GistFilePipe,
    CodeFromUrlPipe
  ],
  exports: [
    HighlightModule,
    GistDirective,
    GistFilePipe,
    CodeFromUrlPipe
  ]
})
export class HighlightPlusModule {
}
