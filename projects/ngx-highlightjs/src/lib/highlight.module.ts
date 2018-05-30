import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { HighlightJS } from './highlight.service';
import { HighlightDirective } from './highlight.directive';
import { HighlightOptions } from './highlight.model';
import { OPTIONS } from './highlight.token';

export function HighlightFactory(options: HighlightOptions) {
  return new HighlightJS(options);
}

@NgModule({
  declarations: [HighlightDirective],
  exports: [HighlightDirective]
})
export class HighlightModule {
  static forRoot(options?: HighlightOptions): ModuleWithProviders {
    return {
      ngModule: HighlightModule,
      providers: [
        {provide: OPTIONS, useValue: options},
        {
          provide: HighlightJS,
          useFactory: HighlightFactory,
          deps: [OPTIONS]
        }
      ]
    };
  }
}
