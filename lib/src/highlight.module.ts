import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { HighlightService } from './highlight.service';
import { HighlightOptions } from './highlight.model';
import { OPTIONS } from './highlight.token';

export function HighlightFactory(options: HighlightOptions) {
  return new HighlightService(options);
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
          provide: HighlightService,
          useFactory: HighlightFactory,
          deps: [OPTIONS]
        }
      ]
    };
  }
}
