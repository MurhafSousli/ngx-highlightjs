import { inject, InjectionToken } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Injection token used to provide the current location to `codeFromUrl` pipe.
 * Used to handle server-side rendering and to stub out during unit tests.
 */
export const HIGHLIGHT_FILE_LOCATION: InjectionToken<any> = new InjectionToken<CodeFileLocation>('HIGHLIGHT_FILE_LOCATION', {
  providedIn: 'root',
  factory: CODE_FILE_LOCATION_FACTORY,
});

export interface CodeFileLocation {
  getPathname: () => string;
}

export function CODE_FILE_LOCATION_FACTORY(): CodeFileLocation {
  const _location: Location = inject(DOCUMENT)?.location;

  return {
    // Note that this needs to be a function, rather than a property, because Angular
    // will only resolve it once, but we want the current path on each call.
    // getPathname: () => (_location ? _location.pathname + _location.search : ''),
    getPathname: () => (_location ? _location.origin : '')
  };
}
