import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, from, zip, EMPTY } from 'rxjs';
import { catchError, tap, map, switchMap, filter, auditTime } from 'rxjs/operators';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
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
    auditTime(0, animationFrame)
  );

  constructor(@Inject(DOCUMENT) document: any,
              @Inject(PLATFORM_ID) platformId: object,
              @Optional() @Inject(HIGHLIGHT_OPTIONS) options: HighlightOptions) {
    // Check if hljs is already available
    if (isPlatformBrowser(platformId) && document.defaultView.hljs) {
      this._ready.next(document.defaultView.hljs);
    } else {
      // Load hljs library
      this._loadLibrary().pipe(
        switchMap((hljs: HighlightLibrary) => {
          // Check if languages property is provided in the global options
          if (options && options.languages && options.languages.length) {
            return this._loadLanguages(options.languages).pipe(
              tap(() => this._ready.next(hljs))
            );
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
  private _loadLibrary(): Observable<HighlightLibrary> {
    return from(import('highlight.js')).pipe(
      filter((module: any) => !!module && !!module.default),
      map((module: any) => module.default)
    );
  }

  /**
   * Lazy-load highlight.js languages
   */
  private _loadLanguages(langArr: string[]): Observable<any> {
    const languages = langArr.map((langName: string) =>
      from(import(`highlight.js/lib/languages/${langName}`)).pipe(
        filter((module: any) => !!module && !!module.default),
        map((module: any) => module.default)
      ));
    return zip(...languages);
  }
}
