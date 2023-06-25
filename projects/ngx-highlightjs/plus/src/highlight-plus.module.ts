import { NgModule } from '@angular/core';
import { GistFilePipe, GistDirective } from './gist';
import { CodeFromUrlPipe } from './code-from-url';

@NgModule({
  imports: [
    GistDirective,
    GistFilePipe,
    CodeFromUrlPipe
  ],
  exports: [
    GistDirective,
    GistFilePipe,
    CodeFromUrlPipe
  ]
})
export class HighlightPlusModule {
}
