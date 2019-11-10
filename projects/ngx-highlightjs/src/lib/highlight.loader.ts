import { Injectable, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, from, EMPTY } from 'rxjs';
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
      this._loadHighlightLibrary().pipe(
        switchMap((hljs: HighlightLibrary) => {
          if (this._options.lineNumbers) {
            // Make hljs available on window object (required for the line numbers library)
            doc.defaultView.hljs = hljs;
            // Load line numbers library
            return this._loadLineNumbers().pipe(tap(() => this._ready.next(hljs)));
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
  private _loadHighlightLibrary(): Observable<HighlightLibrary> {
    return this.importModule(import('highlight.js'));
  }

  /**
   * Lazy-Load highlight.js library
   */
  private _loadLineNumbers(): Observable<HighlightLibrary> {
    return this.importModule(import('highlightjs-line-numbers.js'));
  }

  private importModule(loader: Promise<any>): Observable<any> {
    return from(loader).pipe(
      filter((module: any) => !!module && !!module.default),
      map((module: any) => module.default)
    );
  }


}
