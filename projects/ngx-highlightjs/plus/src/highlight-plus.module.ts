import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HighlightModule } from '../../src/lib/highlight.module';
// import { HighlightModule } from 'ngx-highlightjs';
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
