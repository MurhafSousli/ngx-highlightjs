import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import type { HLJSOptions } from 'highlight.js';

/**
 * Full documentation is available here https://highlightjs.readthedocs.io/en/latest/api.html
 */

export interface LineNumbersOptions {
  startFrom?: number;
  singleLine?: boolean;
}

export interface HighlightJSOptions {
  highlightOptions?: Partial<HLJSOptions>;
  lineNumbersOptions?: LineNumbersOptions;
  languages?: Record<string, () => Promise<unknown>>;
  coreLibraryLoader?: () => Promise<unknown>;
  fullLibraryLoader?: () => Promise<unknown>;
  lineNumbersLoader?: () => Promise<unknown>;
  themePath?: string;
}

export const HIGHLIGHT_OPTIONS: InjectionToken<HighlightJSOptions> = new InjectionToken<HighlightJSOptions>('HIGHLIGHT_OPTIONS');

export function provideHighlightOptions(options: HighlightJSOptions): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: options
    }
  ]);
}
