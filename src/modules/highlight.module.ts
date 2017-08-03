import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { HighlightDirective } from '../directives/highlight.directive';
import { HighlightService } from '../service/highlight.service';
import { HighlightOptions } from '../models/highlight-options';

export function HighlightFactory(options: HighlightOptions) {
  return new HighlightService(options);
}

export const OPTIONS = new InjectionToken<HighlightOptions>('options');

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
          provide: HighlightService,
          useFactory: HighlightFactory,
          deps: [OPTIONS]
        }
      ]
    };
  }
}
