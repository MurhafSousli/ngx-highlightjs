import { NgModule } from '@angular/core';
import { Highlight } from './highlight';
import { HighlightAuto } from './highlight-auto';

@NgModule({
  imports: [Highlight, HighlightAuto],
  exports: [Highlight, HighlightAuto]
})
export class HighlightModule {
}
