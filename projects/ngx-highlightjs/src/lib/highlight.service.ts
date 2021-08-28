import { Injectable, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import {
  HighlightConfig,
  HighlightResult,
  HighlightLibrary,
  HighlightOptions,
  HIGHLIGHT_OPTIONS,
  HighlightAutoResult
} from './highlight.model';
import { HighlightLoader } from './highlight.loader';

@Injectable({
  providedIn: 'root'
})
export class HighlightJS {

  private _hljs: HighlightLibrary | null = null;

  // A reference for hljs library
  get hljs(): HighlightLibrary | null {
    return this._hljs;
  }

  constructor(private _loader: HighlightLoader, @Optional() @Inject(HIGHLIGHT_OPTIONS) options: HighlightOptions) {
    // Load highlight.js library on init
    _loader.ready.subscribe((hljs: HighlightLibrary) => {
      this._hljs = hljs;
      if (options && options.config) {
        // Set global config if present
        hljs.configure(options.config);
        if (hljs.listLanguages().length < 1) {
          console.error('[HighlightJS]: No languages were registered!');
        }
      }
    });
  }

  /**
   * Core highlighting function. Accepts the code to highlight (string) and a list of options (object)
   * @param code Accepts the code to highlight
   * @param language must be present and specify the language name or alias of the grammar to be used for highlighting
   * @param ignoreIllegals (optional) when set to true it forces highlighting to finish even in case of detecting illegal syntax for the language instead of throwing an exception.
   */
  highlight(code: string, { language, ignoreIllegals }: { language: string, ignoreIllegals: boolean }): Observable<HighlightResult> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.highlight(code, { language, ignoreIllegals }))
    );
  }

  /**
   * Highlighting with language detection.
   * @param value Accepts a string with the code to highlight
   * @param languageSubset An optional array of language names and aliases restricting detection to only those languages.
   * The subset can also be set with configure, but the local parameter overrides the option if set.
   */
  highlightAuto(value: string, languageSubset: string[]): Observable<HighlightAutoResult> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.highlightAuto(value, languageSubset))
    );
  }

  /**
   * Applies highlighting to a DOM node containing code.
   * This function is the one to use to apply highlighting dynamically after page load or within initialization code of third-party JavaScript frameworks.
   * The function uses language detection by default but you can specify the language in the class attribute of the DOM node. See the scopes reference for all available language names and scopes.
   * @param element
   */
  highlightElement(element: HTMLElement): Observable<any> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.highlightElement(element))
    );
  }

  /**
   * Applies highlighting to all elements on a page matching the configured cssSelector. The default cssSelector value is 'pre code',
   * which highlights all code blocks. This can be called before or after the page’s onload event has fired.
   */
  highlightAll(): Observable<any> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.highlightAll())
    );
  }

  /**
   * @deprecated in version 12
   * Configures global options:
   * @param config HighlightJs configuration argument
   */
  configure(config: HighlightConfig): Observable<void> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.configure(config))
    );
  }

  /**
   * Adds new language to the library under the specified name. Used mostly internally.
   * @param languageName A string with the name of the language being registered
   * @param languageDefinition A function that returns an object which represents the language definition.
   * The function is passed the hljs object to be able to use common regular expressions defined within it.
   */
  registerLanguage(languageName: string, languageDefinition: () => any): Observable<HighlightLibrary> {
    return this._loader.ready.pipe(
      tap((hljs: HighlightLibrary) => hljs.registerLanguage(languageName, languageDefinition))
    );
  }

  /**
   * Removes a language and its aliases from the library. Used mostly internall
   * @param languageName: a string with the name of the language being removed.
   */
  unregisterLanguage(languageName: string): Observable<any> {
    return this._loader.ready.pipe(
      tap((hljs: HighlightLibrary) => hljs.unregisterLanguage(languageName))
    );
  }

  /**
   * Adds new language alias or aliases to the library for the specified language name defined under languageName key.
   * @param alias: A string or array with the name of alias being registered
   * @param languageName: the language name as specified by registerLanguage.
   */
  registerAliases(alias: string | string[], { languageName }: { languageName: string }): Observable<any> {
    return this._loader.ready.pipe(
      tap((hljs: HighlightLibrary) => hljs.registerAliases(alias, { languageName }))
    );
  }


  /**
   * @return The languages names list.
   */
  listLanguages(): Observable<string[] | undefined> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.listLanguages())
    );
  }

  /**
   * Looks up a language by name or alias.
   * @param name Language name
   * @return The language object if found, undefined otherwise.
   */
  getLanguage(name: string): Observable<any> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.getLanguage(name))
    );
  }

  /**
   * Enables safe mode. This is the default mode, providing the most reliable experience for production usage.
   */
  safeMode(): Observable<any> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.safeMode())
    );
  }

  /**
   * Enables debug/development mode.
   */
  debugMode(): Observable<any> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.debugMode())
    );
  }

  /**
   * Display line numbers
   * @param el Code element
   */
  lineNumbersBlock(el: HTMLElement): Observable<any> {
    return this._loader.ready.pipe(
      filter((hljs: HighlightLibrary) => !!hljs.lineNumbersBlock),
      tap((hljs: HighlightLibrary) => hljs.lineNumbersBlock(el))
    );
  }
}
