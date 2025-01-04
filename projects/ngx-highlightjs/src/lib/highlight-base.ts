import {
  Directive,
  inject,
  afterRenderEffect,
  ElementRef,
  InputSignal,
  WritableSignal,
  SecurityContext,
  OutputEmitterRef
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import type { AutoHighlightResult, HighlightResult } from 'highlight.js';
import { HighlightJS } from './highlight.service';
import { trustedHTMLFromStringBypass } from './trusted-types';

@Directive()
export abstract class HighlightBase {

  protected _hljs: HighlightJS = inject(HighlightJS);

  private readonly _nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private _sanitizer: DomSanitizer = inject(DomSanitizer);

  // Code to highlight
  abstract code: InputSignal<string>;

  // Highlighted result
  abstract highlightResult: WritableSignal<HighlightResult | AutoHighlightResult>;

  // Stream that emits when code string is highlighted
  abstract highlighted: OutputEmitterRef<HighlightResult | AutoHighlightResult>;


  constructor() {
    afterRenderEffect({
      write: () => {
        const code: string = this.code();
        // Set code text before highlighting
        this.setTextContent(code || '');
        if (code) {
          this.highlightElement(code);
        }
      }
    });

    afterRenderEffect({
      write: () => {
        const res: AutoHighlightResult = this.highlightResult();
        this.setInnerHTML(res?.value);
        // Forward highlight response to the highlighted output
        this.highlighted.emit(res);
      }
    });
  }

  protected abstract highlightElement(code: string): Promise<void> ;

  private setTextContent(content: string): void {
    requestAnimationFrame(() =>
      this._nativeElement.textContent = content
    );
  }

  private setInnerHTML(content: string | null): void {
    requestAnimationFrame(() =>
      this._nativeElement.innerHTML = trustedHTMLFromStringBypass(
        this._sanitizer.sanitize(SecurityContext.HTML, content) || ''
      )
    );
  }
}
