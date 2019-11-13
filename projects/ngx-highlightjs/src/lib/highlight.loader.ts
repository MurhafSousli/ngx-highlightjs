import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, from, EMPTY, zip } from 'rxjs';
import { catchError, tap, map, switchMap, filter, take } from 'rxjs/operators';
import { HIGHLIGHT_OPTIONS, HighlightLibrary, HighlightOptions } from './highlight.model';

// @dynamic
@Injectable({
  providedIn: 'root'
})
export class HighlightLoader {
  // Stream that emits when hljs library is loaded and ready to use
  private readonly _ready = new BehaviorSubject(null);
  readonly ready = this._ready.asObservable().pipe(
    filter((hljs: HighlightLibrary) => !!hljs),
    take(1)
  );

  constructor(@Inject(DOCUMENT) doc: any,
              @Inject(PLATFORM_ID) platformId: object,
              @Optional() @Inject(HIGHLIGHT_OPTIONS) private _options: HighlightOptions) {
    // Check if hljs is already available
    if (isPlatformBrowser(platformId) && doc.defaultView.hljs) {
      this._ready.next(doc.defaultView.hljs);
    } else {
      // Load hljs library
      this._loadLibrary().pipe(
        switchMap((hljs: HighlightLibrary) => {
          if (this._options && this._options.lineNumbers) {
            // Make hljs available on window object (required for the line numbers library)
            doc.defaultView.hljs = hljs;
            // Load line numbers library
            return loadLineNumbers().pipe(tap(() => this._ready.next(hljs)));
          } else {
            this._ready.next(hljs);
            return EMPTY;
          }
        }),
        catchError((e: any) => {
          console.error('Unable to load hljs library', e);
          return EMPTY;
        })
      ).subscribe();
    }
  }

  /**
   * Lazy-Load highlight.js library
   */
  private _loadLibrary(): Observable<any> {
    return (this._options && this._options.languages && Object.keys(this._options.languages).length)
      ? from(loadCoreLibrary()).pipe(switchMap((hljs: any) => this._loadLanguages(hljs)))
      : from(loadAllLibrary());
  }

  /**
   * Lazy-load highlight.js languages
   */
  private _loadLanguages(hljs: HighlightLibrary): Observable<any> {
    const languages = Object.entries(this._options.languages).map(([langName, langLoader]) =>
      importModule(langLoader()).pipe(
        tap((langFunc: any) => hljs.registerLanguage(langName, langFunc))
      )
    );
    return zip(...languages).pipe(map(() => hljs));
  }
}

/**
 * Import highlight.js core library
 */
function loadCoreLibrary(): Observable<HighlightLibrary> {
  return importModule(import('highlight.js/lib/highlight'));
}

/**
 * Import highlight.js library with all languages
 */
function loadAllLibrary(): Observable<HighlightLibrary> {
  return importModule(import('highlight.js'));
}

/**
 * Import line numbers library
 */
function loadLineNumbers(): Observable<any> {
  return importModule(import('highlightjs-line-numbers.js'));
}

/**
 * Map loader response to module object
 */
const importModule = (moduleLoader: Promise<any>): Observable<any> => {
  return from(moduleLoader).pipe(
    filter((module: any) => !!module && !!module.default),
    map((module: any) => module.default)
  );
};
