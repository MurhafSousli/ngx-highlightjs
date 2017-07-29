import { NgModule } from '@angular/core';
import { HighlightUmdDirective } from '../directives/highlight-umd.directive';

@NgModule({
  declarations: [HighlightUmdDirective],
  exports: [HighlightUmdDirective]
})
export class HighlightUmdModule {
}
