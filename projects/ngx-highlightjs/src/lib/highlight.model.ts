import { InjectionToken } from '@angular/core';

/**
 * Full documentation is available here https://highlightjs.readthedocs.io/en/latest/api.html
 */

export interface HighlightLibrary {

  /**
   * Core highlighting function. Accepts the code to highlight (string) and a list of options (object)
   * @param code Accepts the code to highlight
   * @param language must be present and specify the language name or alias of the grammar to be used for highlighting
   * @param ignoreIllegals (optional) when set to true it forces highlighting to finish even in case of detecting illegal syntax for the language instead of throwing an exception.
   */
  highlight(code: string, { language, ignoreIllegals }: { language: string, ignoreIllegals: boolean }): HighlightResult;

  /**
   * Highlighting with language detection.
   * @param value Accepts a string with the code to highlight
   * @param languageSubset An optional array of language names and aliases restricting detection to only those languages.
   * The subset can also be set with configure, but the local parameter overrides the option if set.
   */
  highlightAuto(value: string, languageSubset: string[]): HighlightAutoResult;

  /**
   * Applies highlighting to a DOM node containing code.
   * This function is the one to use to apply highlighting dynamically after page load or within initialization code of third-party
   * JavaScript frameworks.
   * The function uses language detection by default but you can specify the language in the class attribute of the DOM node.
   * See the scopes reference for all available language names and scopes.
   * @param element Element to highlight
   */
  highlightElement(element: HTMLElement): void;

  /**
   * Applies highlighting to all elements on a page matching the configured cssSelector. The default cssSelector value is 'pre code',
   * which highlights all code blocks. This can be called before or after the page’s onload event has fired.
   */
  highlightAll(): void;

  /**
   * Configures global options:
   * @param config HighlightJs configuration argument
   */
  configure(config: HighlightConfig): void;

  /**
   * Adds new language to the library under the specified name. Used mostly internally.
   * @param languageName A string with the name of the language being registered
   * @param languageDefinition A function that returns an object which represents the language definition.
   * The function is passed the hljs object to be able to use common regular expressions defined within it.
   */
  registerLanguage(languageName: string, languageDefinition: () => any): void;

  /**
   * Removes a language and its aliases from the library. Used mostly internall
   * @param languageName: a string with the name of the language being removed.
   */
  unregisterLanguage(languageName: string): void;

  /**
   * Adds new language alias or aliases to the library for the specified language name defined under languageName key.
   * @param alias: A string or array with the name of alias being registered
   * @param languageName: the language name as specified by registerLanguage.
   */
  registerAliases(alias: string | string[], { languageName }: { languageName: string }): void;

  /**
   * @return The languages names list.
   */
  listLanguages(): string[];

  /**
   * Looks up a language by name or alias.
   * @param name Language name
   * @return The language object if found, undefined otherwise.
   */
  getLanguage(name: string): any;

  /**
   * Enables safe mode. This is the default mode, providing the most reliable experience for production usage.
   */
  safeMode(): void;

  /**
   * Enables debug/development mode.
   */
  debugMode(): void;

  /**
   * Add line numbers to code element
   * @param el Code element
   */
  lineNumbersBlock(el: Element): void;
}

export interface HighlightConfig {
  /** classPrefix: a string prefix added before class names in the generated markup, used for backwards compatibility with stylesheets. */
  classPrefix?: string;
  /** languages: an array of language names and aliases restricting auto detection to only these languages. */
  languages?: string[];
  /** languageDetectRe: a regex to configure how CSS class names map to language (allows class names like say color-as-php vs the default of language-php, etc.) */
  languageDetectRe: string;
  /** noHighlightRe: a regex to configure which CSS classes are to be skipped completely. */
  noHighlightRe: string;
  /** a CSS selector to configure which elements are affected by hljs.highlightAll. Defaults to 'pre code'. */
  cssSelector: string;
}

export interface HighlightResult {
  language?: string;
  value?: string | undefined;
  relevance?: number;
  top: any;
  code: string;
  illegal: boolean;
}

export interface HighlightAutoResult {
  language?: string;
  secondBest?: any;
  value?: string | undefined;
  relevance?: number;
}

export interface HighlightOptions {
  config?: HighlightConfig;
  languages?: { [name: string]: () => Promise<any> };
  coreLibraryLoader?: () => Promise<any>;
  fullLibraryLoader?: () => Promise<any>;
  lineNumbersLoader?: () => Promise<any>;
  themePath?: string;
}

export const HIGHLIGHT_OPTIONS = new InjectionToken<HighlightOptions>('HIGHLIGHT_OPTIONS');
