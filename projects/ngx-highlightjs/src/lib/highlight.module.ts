import { ModuleWithProviders, NgModule } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { HighlightOptions } from './highlight.model';
import { OPTIONS } from './highlight.token';

@NgModule({
  declarations: [HighlightDirective],
  exports: [HighlightDirective]
})
export class HighlightModule {
  static forRoot(options?: HighlightOptions): ModuleWithProviders {
    return {
      ngModule: HighlightModule,
      providers: [
        {provide: OPTIONS, useValue: options}
      ]
    };
  }
}
