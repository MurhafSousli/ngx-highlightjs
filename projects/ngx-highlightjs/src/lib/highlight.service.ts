import { Injectable, Inject, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, filter, tap, switchMap } from 'rxjs/operators';
import { HighlightConfig, HighlightOptions, HighlightResult } from './highlight.model';
import { OPTIONS } from './highlight.token';

@Injectable({
  providedIn: 'root'
})
export class HighlightJS {

  hljs: any;

  options: HighlightOptions = {
    theme: 'github',
    path: 'assets/lib/hljs',
    auto: true
  };

  private _isReady$ = new BehaviorSubject(false);

  // Stream that emits when highlightjs is loaded
  get isReady(): Observable<boolean> {
    return this._isReady$.pipe(
      filter(isReady => isReady),
      take(1)
    );
  }

  constructor(@Optional() @Inject(OPTIONS) options: HighlightOptions,
              @Inject(DOCUMENT) private _document: any) {
    this.options = { ...this.options, ...options };

    this._hljsLoader().subscribe();
    this._themeLoader().subscribe();
  }

  highlight(name: string, value: string, ignore_illegals: boolean, continuation?: any): HighlightResult {
    if (this.hljs) {
      return this.hljs.highlight(name, value, ignore_illegals, continuation);
    }
  }

  highlightAuto(value: string, languageSubset: string[]): HighlightResult {
    if (this.hljs) {
      return this.hljs.highlightAuto(value, languageSubset);
    }
  }

  fixMarkup(value: string): string {
    if (this.hljs) {
      return this.hljs.fixMarkup(value);
    }
  }

  highlightBlock(block: HTMLElement) {
    if (this.hljs) {
      this.hljs.highlightBlock(block);
    }
  }

  configure(config: HighlightConfig) {
    if (this.hljs) {
      this.hljs.configure(config);
    }
  }

  initHighlighting() {
    if (this.hljs) {
      this.hljs.initHighlighting();
    }
  }

  initHighlightingOnLoad() {
    if (this.hljs) {
      this.hljs.initHighlightingOnLoad();
    }
  }

  registerLanguage(name: string, language: Function) {
    if (this.hljs) {
      this.hljs.registerLanguage(name, language);
    }
  }

  listLanguages(): string[] {
    if (this.hljs) {
      return this.hljs.listLanguages();
    }
  }

  getLanguage(name: string): any {
    if (this.hljs) {
      return this.hljs.getLanguage(name);
    }
  }

  private _hljsLoader(): Observable<any> {
    return this._document.defaultView.hljs ? this._initHLJS() : this._loadScript();
  }

  /**
   * Load hljs script
   */
  private _loadScript(): Observable<any> {
    const promise = new Promise((resolve) => {
      const script = this._document.createElement('script');
      script.async = true;
      script.type = 'text/javascript';
      script.onload = resolve;
      script.src = `${this.options.path}/highlight.pack.js`;
      this._document.head.appendChild(script);
    });
    return from(promise).pipe(
      switchMap(() => this._initHLJS())
    );
  }

  /**
   * Load hljs theme
   */
  private _themeLoader(): Observable<any> {
    const promise = new Promise((resolve) => {
      const style = this._document.createElement('link');
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.onload = resolve;
      style.href = `${this.options.path}/styles/${this.options.theme}.css`;
      this._document.head.appendChild(style);
    });
    return from(promise);
  }

  /**
   * Initialize hljs on load
   */
  private _initHLJS() {
    return of({}).pipe(
      tap(() => {
        this.hljs = this._document.defaultView.hljs;
        this.hljs.configure(this.options.config);
        this._isReady$.next(true);
      })
    );
  }
}
