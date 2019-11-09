import { Injectable, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HighlightConfig, HighlightResult, HighlightLibrary, HighlightOptions, HIGHLIGHT_OPTIONS } from './highlight.model';
import { HighlightLoader } from './highlight.loader';

@Injectable({
  providedIn: 'root'
})
export class HighlightJS {

  private _hljs!: HighlightLibrary;

  // A reference for hljs library
  get hljs(): HighlightLibrary | null {
    return this._hljs;
  }

  constructor(private _loader: HighlightLoader, @Optional() @Inject(HIGHLIGHT_OPTIONS) options: HighlightOptions) {
    // Load highlight.js library on init
    _loader.ready.pipe().subscribe((hljs: HighlightLibrary) => {
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
   * Core highlighting function.
   * @param name Accepts a language name, or an alias
   * @param value A string with the code to highlight.
   * @param ignore_illegals When present and evaluates to a true value, forces highlighting to finish
   * even in case of detecting illegal syntax for the language instead of throwing an exception.
   * @param continuation An optional mode stack representing unfinished parsing.
   * When present, the function will restart parsing from this state instead of initializing a new one
   */
  highlight(name: string, value: string, ignore_illegals: boolean, continuation?: any): Observable<HighlightResult> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.highlight(name, value, ignore_illegals, continuation))
    );
  }

  /**
   * Highlighting with language detection.
   * @param value Accepts a string with the code to highlight
   * @param languageSubset An optional array of language names and aliases restricting detection to only those languages.
   * The subset can also be set with configure, but the local parameter overrides the option if set.
   */
  highlightAuto(value: string, languageSubset: string[]): Observable<HighlightResult> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.highlightAuto(value, languageSubset))
    );
  }

  /**
   * Post-processing of the highlighted markup.
   * Currently consists of replacing indentation TAB characters and using <br> tags instead of new-line characters.
   * Options are set globally with configure.
   * @param value Accepts a string with the highlighted markup
   */
  fixMarkup(value: string): Observable<string> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.fixMarkup(value))
    );
  }

  /**
   * Applies highlighting to a DOM node containing code.
   * The function uses language detection by default but you can specify the language in the class attribute of the DOM node.
   * See the class reference for all available language names and aliases.
   * @param block The element to apply highlight on.
   */
  highlightBlock(block: HTMLElement): Observable<void> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.highlightBlock(block))
    );
  }

  /**
   * Configures global options:
   * @param config HighlightJs configuration argument
   */
  configure(config: HighlightConfig): Observable<void> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.configure(config))
    );
  }

  /**
   * Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
   */
  initHighlighting(): Observable<void> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.initHighlighting())
    );
  }

  /**
   * Adds new language to the library under the specified name. Used mostly internally.
   * @param name A string with the name of the language being registered
   * @param language A function that returns an object which represents the language definition.
   * The function is passed the hljs object to be able to use common regular expressions defined within it.
   */
  registerLanguage(name: string, language: () => any): Observable<void> {
    return this._loader.ready.pipe(
      map((hljs: HighlightLibrary) => hljs.registerLanguage(name, language))
    );
  }

  /**
   * @return The languages names list.
   */
  listLanguages(): Observable<string[]> {
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
}
