import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { HighlightDirective } from '../directives/highlight.directive';
import { HighlightService } from '../service/highlight.service';

/** Initialize HighlightService with theme and path */
export function HighlightFactory(theme: string, path: string) {
  return new HighlightService(theme, path);
}

export const PATH = new InjectionToken<string>('path');
export const THEME = new InjectionToken<string>('theme');

@NgModule({
  declarations: [HighlightDirective],
  exports: [HighlightDirective]
})
export class HighlightModule {
  static forRoot(theme?: string, path?: string): ModuleWithProviders {
    return {
      ngModule: HighlightModule,
      providers: [
        {provide: THEME, useValue: theme},
        {provide: PATH, useValue: path},
        {
          provide: HighlightService,
          useFactory: HighlightFactory,
          deps: [THEME, PATH]
        }
      ]
    };
  }
}
