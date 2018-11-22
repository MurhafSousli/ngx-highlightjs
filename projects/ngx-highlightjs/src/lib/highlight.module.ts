import { ModuleWithProviders, NgModule } from '@angular/core';
import { Highlight } from './highlight';
import { HighlightChildren } from './highlight-children';
import { HighlightOptions, HIGHLIGHT_OPTIONS } from './highlight.model';

@NgModule({
  declarations: [Highlight, HighlightChildren],
  exports: [Highlight, HighlightChildren]
})
export class HighlightModule {
  static forRoot(options: HighlightOptions): ModuleWithProviders {
    return {
      ngModule: HighlightModule,
      providers: [
        {provide: HIGHLIGHT_OPTIONS, useValue: options}
      ]
    };
  }
}
