import { Injectable, signal, inject, computed, WritableSignal, Signal } from '@angular/core';
import type {
  HLJSApi,
  LanguageFn,
  HLJSOptions,
  HighlightResult,
  HighlightOptions,
  AutoHighlightResult
} from 'highlight.js';
import { HighlightJSOptions, LineNumbersOptions, HIGHLIGHT_OPTIONS } from './highlight.model';
import { HighlightLoader } from './highlight.loader';


@Injectable({
  providedIn: 'root'
})
export class HighlightJS {

  private readonly loader: HighlightLoader = inject(HighlightLoader);

  private readonly options: Partial<HighlightJSOptions> = inject(HIGHLIGHT_OPTIONS, { optional: true });

  private readonly hljsSignal: WritableSignal<HLJSApi> = signal(null);

  readonly hljs: Signal<HLJSApi> = computed(() => this.hljsSignal());

  constructor() {
    // Load highlight.js library on init
    this.loader.ready.then((hljs: HLJSApi) => {
      this.hljsSignal.set(hljs);
      if (this.options?.highlightOptions) {
        // Set global config if present
        hljs.configure(this.options.highlightOptions);
      }
    });
  }

  /**
   * Core highlighting function. Accepts the code to highlight (string) and a list of options (object)
   */
  async highlight(code: string, options: HighlightOptions): Promise<HighlightResult> {
    const hljs: HLJSApi = await this.loader.ready;
    return hljs.highlight(code, options);
  }

  /**
   * Highlighting with language detection.
   */
  async highlightAuto(value: string, languageSubset: string[]): Promise<AutoHighlightResult> {
    const hljs: HLJSApi = await this.loader.ready;
    return hljs.highlightAuto(value, languageSubset);
  }

  /**
   * Applies highlighting to a DOM node containing code.
   * This function is the one to use to apply highlighting dynamically after page load or within initialization code of third-party JavaScript frameworks.
   * The function uses language detection by default but you can specify the language in the class attribute of the DOM node. See the scopes reference for all available language names and scopes.
   */
  async highlightElement(element: HTMLElement): Promise<void> {
    const hljs: HLJSApi = await this.loader.ready;
    hljs.highlightElement(element);
  }

  /**
   * Applies highlighting to all elements on a page matching the configured cssSelector. The default cssSelector value is 'pre code',
   * which highlights all code blocks. This can be called before or after the page’s onload event has fired.
   */
  async highlightAll(): Promise<void> {
    const hljs: HLJSApi = await this.loader.ready;
    hljs.highlightAll();
  }

  /**
   * @deprecated in version 12
   * Configures global options:
   */
  async configure(config: Partial<HLJSOptions>): Promise<void> {
    const hljs: HLJSApi = await this.loader.ready;
    hljs.configure(config);
  }

  /**
   * Adds new language to the library under the specified name. Used mostly internally.
   * The function is passed the hljs object to be able to use common regular expressions defined within it.
   */
  async registerLanguage(languageName: string, languageDefinition: LanguageFn): Promise<void> {
    const hljs: HLJSApi = await this.loader.ready;
    hljs.registerLanguage(languageName, languageDefinition);
  }

  /**
   * Removes a language and its aliases from the library. Used mostly internally
   */
  async unregisterLanguage(languageName: string): Promise<void> {
    const hljs: HLJSApi = await this.loader.ready;
    hljs.unregisterLanguage(languageName);
  }

  /**
   * Adds new language alias or aliases to the library for the specified language name defined under languageName key.
   */
  async registerAliases(alias: string | string[], { languageName }: { languageName: string }): Promise<void> {
    const hljs: HLJSApi = await this.loader.ready;
    hljs.registerAliases(alias, { languageName });
  }


  /**
   * @return The languages names list.
   */
  async listLanguages(): Promise<string[]> {
    const hljs: HLJSApi = await this.loader.ready;
    return hljs.listLanguages();
  }

  /**
   * Looks up a language by name or alias.
   */
  async getLanguage(name: string): Promise<any> {
    const hljs: HLJSApi = await this.loader.ready;
    return hljs.getLanguage(name);
  }

  /**
   * Enables safe mode. This is the default mode, providing the most reliable experience for production usage.
   */
  async safeMode(): Promise<void> {
    const hljs: HLJSApi = await this.loader.ready;
    hljs.safeMode();
  }

  /**
   * Enables debug/development mode.
   */
  async debugMode(): Promise<void> {
    const hljs: HLJSApi = await this.loader.ready;
    hljs.debugMode();
  }

  /**
   * Display line numbers
   */
  async lineNumbersBlock(el: HTMLElement, options: LineNumbersOptions): Promise<void> {
    const hljs: HLJSApi = await this.loader.ready;
    if ((hljs as any).lineNumbersBlock) {
      (hljs as any).lineNumbersBlock(el, options);
    }
  }
}
