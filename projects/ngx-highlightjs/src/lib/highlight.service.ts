import { Injectable, Inject, Optional } from '@angular/core';
import { HighlightConfig, HighlightResult, HighlightLanguage, HighlightOptions, HIGHLIGHT_OPTIONS } from './highlight.model';
import hljs from 'highlight.js/lib/highlight.js';

function exposeHljsGlobally() {
  if(!(window as any).eval || !window.document) {
    return false;
  }
  (window.document as any).hljs = hljs;
  (window as any).eval('var hljs = document.hljs');
  return true;
}
exposeHljsGlobally()

@Injectable({
  providedIn: 'root'
})
export class HighlightJS {
  constructor(@Optional() @Inject(HIGHLIGHT_OPTIONS) options: HighlightOptions) {
    if (options) {
      // Register HighlightJS languages
      options.languages().map((language: HighlightLanguage) =>
        this.registerLanguage(language.name, language.func)
      );
      if (options.config) {
        // Set global config if present
        this.configure(options.config);
      }
    }
    // Throw an error if no languages were registered.
    if (this.listLanguages().length < 1) {
      throw new Error('[HighlightJS]: No languages were registered!');
    }
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
  highlight(name: string, value: string, ignore_illegals: boolean, continuation?: any): HighlightResult {
    return hljs.highlight(name, value, ignore_illegals, continuation);
  }

  /**
   * Highlighting with language detection.
   * @param value Accepts a string with the code to highlight
   * @param languageSubset An optional array of language names and aliases restricting detection to only those languages.
   * The subset can also be set with configure, but the local parameter overrides the option if set.
   */
  highlightAuto(value: string, languageSubset: string[]): HighlightResult {
    return hljs.highlightAuto(value, languageSubset);
  }

  /**
   * Post-processing of the highlighted markup.
   * Currently consists of replacing indentation TAB characters and using <br> tags instead of new-line characters.
   * Options are set globally with configure.
   * @param value Accepts a string with the highlighted markup
   */
  fixMarkup(value: string): string {
    return hljs.fixMarkup(value);
  }

  /**
   * Applies highlighting to a DOM node containing code.
   * The function uses language detection by default but you can specify the language in the class attribute of the DOM node.
   * See the class reference for all available language names and aliases.
   * @param block The element to apply highlight on.
   */
  highlightBlock(block: HTMLElement) {
    hljs.highlightBlock(block);
  }

  /**
   * Configures global options:
   * @param config
   */
  configure(config: HighlightConfig) {
    hljs.configure(config);
  }

  /**
   * Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
   */
  initHighlighting() {
    hljs.initHighlighting();
  }

  /**
   * Adds new language to the library under the specified name. Used mostly internally.
   * @param name A string with the name of the language being registered
   * @param language A function that returns an object which represents the language definition.
   * The function is passed the hljs object to be able to use common regular expressions defined within it.
   */
  registerLanguage(name: string, language: Function) {
    hljs.registerLanguage(name, language);
  }

  /**
   * @return The languages names list.
   */
  listLanguages(): string[] {
    return hljs.listLanguages();
  }

  /**
   * Looks up a language by name or alias.
   * @param name Language name
   * @return The language object if found, undefined otherwise.
   */
  getLanguage(name: string): any {
    return hljs.getLanguage(name);
  }
}


