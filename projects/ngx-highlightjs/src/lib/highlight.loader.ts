import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Observable,
  BehaviorSubject,
  EMPTY,
  tap,
  map,
  from,
  filter,
  forkJoin,
  switchMap,
  throwError,
  catchError,
  firstValueFrom
} from 'rxjs';
import { HIGHLIGHT_OPTIONS, HighlightJSOptions } from './highlight.model';
import type { HLJSApi } from 'highlight.js';
import { LoaderErrors } from './loader-errors';

@Injectable({
  providedIn: 'root'
})
export class HighlightLoader {

  private document: Document = inject(DOCUMENT);
  private isPlatformBrowser: boolean = isPlatformBrowser(inject(PLATFORM_ID));
  private options: HighlightJSOptions = inject(HIGHLIGHT_OPTIONS, { optional: true });

  // Stream that emits when hljs library is loaded and ready to use
  private readonly _ready: BehaviorSubject<HLJSApi> = new BehaviorSubject<HLJSApi>(null);

  readonly ready: Promise<HLJSApi> = firstValueFrom(this._ready.asObservable().pipe(
    filter((hljs: HLJSApi) => !!hljs),
  ));

  private _themeLinkElement: HTMLLinkElement;

  constructor() {
    if (this.isPlatformBrowser) {
      // Check if hljs is already available
      if (this.document.defaultView['hljs']) {
        this._ready.next(this.document.defaultView['hljs']);
      } else {
        // Load hljs library
        this._loadLibrary().pipe(
          switchMap((hljs: HLJSApi) => {
            if (this.options?.lineNumbersLoader) {
              // Make hljs available on window object (required for the line numbers library)
              this.document.defaultView['hljs'] = hljs;
              // Load line numbers library
              return this.loadLineNumbers().pipe(
                tap((plugin: { activateLineNumbers: () => void }) => {
                  plugin.activateLineNumbers();
                  this._ready.next(hljs);
                })
              );
            }
            else {
              this._ready.next(hljs);
              return EMPTY;
            }
          }),
          catchError((e: any) => {
            console.error('[HLJS] ', e);
            this._ready.error(e);
            return EMPTY;
          })
        ).subscribe();

      }
      // Load highlighting theme
      if (this.options?.themePath) {
        this.loadTheme(this.options.themePath);
      }
    }
  }

  /**
   * Lazy-Load highlight.js library
   */
  private _loadLibrary(): Observable<any> {
    if (this.options) {
      if (this.options.fullLibraryLoader && this.options.coreLibraryLoader) {
        return throwError(() => LoaderErrors.FULL_WITH_CORE_LIBRARY_IMPORTS);
      }
      if (this.options.fullLibraryLoader && this.options.languages) {
        return throwError(() => LoaderErrors.FULL_WITH_LANGUAGE_IMPORTS);
      }
      if (this.options.coreLibraryLoader && !this.options.languages) {
        return throwError(() => LoaderErrors.CORE_WITHOUT_LANGUAGE_IMPORTS);
      }
      if (!this.options.coreLibraryLoader && this.options.languages) {
        return throwError(() => LoaderErrors.LANGUAGE_WITHOUT_CORE_IMPORTS);
      }
      if (this.options.fullLibraryLoader) {
        return this.loadFullLibrary();
      }
      if (this.options.coreLibraryLoader && this.options.languages && Object.keys(this.options.languages).length) {
        return this.loadCoreLibrary().pipe(switchMap((hljs: HLJSApi) => this._loadLanguages(hljs)));
      }
    }
    return throwError(() => LoaderErrors.NO_FULL_AND_NO_CORE_IMPORTS);
  }

  /**
   * Lazy-load highlight.js languages
   */
  private _loadLanguages(hljs: HLJSApi): Observable<HLJSApi> {
    const languages: Observable<any>[] = Object.entries(this.options.languages).map(([langName, langLoader]: [string, () => Promise<any>]) =>
      importModule(langLoader()).pipe(
        tap((langFunc: any) => hljs.registerLanguage(langName, langFunc))
      )
    );
    return forkJoin(languages).pipe(map(() => hljs));
  }


  /**
   * Import highlight.js core library
   */
  private loadCoreLibrary(): Observable<HLJSApi> {
    return importModule(this.options.coreLibraryLoader!());
  }

  /**
   * Import highlight.js library with all languages
   */
  private loadFullLibrary(): Observable<HLJSApi> {
    return importModule(this.options.fullLibraryLoader!());
  }

  /**
   * Import line numbers library
   */
  private loadLineNumbers(): Observable<any> {
    return from(this.options.lineNumbersLoader!());
  }

  /**
   * Reload theme styles
   */
  setTheme(path: string): void {
    if (this.isPlatformBrowser) {
      if (this._themeLinkElement) {
        this._themeLinkElement.href = path;
      } else {
        this.loadTheme(path);
      }
    }
  }

  /**
   * Load theme
   */
  private loadTheme(path: string): void {
    this._themeLinkElement = this.document.createElement('link');
    this._themeLinkElement.href = path;
    this._themeLinkElement.type = 'text/css';
    this._themeLinkElement.rel = 'stylesheet';
    this._themeLinkElement.media = 'screen,print';
    this.document.head.appendChild(this._themeLinkElement);
  }
}

/**
 * Map loader response to module object
 */
const importModule = (moduleLoader: Promise<any>): Observable<any> => {
  return from(moduleLoader).pipe(
    filter((module: any) => !!module?.default),
    map((module: any) => module.default)
  );
};
