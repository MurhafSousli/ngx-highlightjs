import {
  Directive,
  inject,
  effect,
  ElementRef,
  InputSignal,
  WritableSignal,
  SecurityContext,
  OutputEmitterRef,
  PLATFORM_ID,
  PendingTasks
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import type { AutoHighlightResult, HighlightResult } from 'highlight.js';
import { HighlightJS } from './highlight.service';
import { trustedHTMLFromStringBypass } from './trusted-types';

@Directive()
export abstract class HighlightBase {

  protected _hljs: HighlightJS = inject(HighlightJS);

  private readonly _nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly _isPlatformBrowser: boolean = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly _pendingTasks: PendingTasks = inject(PendingTasks);
  private _sanitizer: DomSanitizer = inject(DomSanitizer);
  private _highlightRequestId = 0;

  // Code to highlight
  abstract code: InputSignal<string>;

  // Highlighted result
  abstract highlightResult: WritableSignal<HighlightResult | AutoHighlightResult>;

  // Stream that emits when code string is highlighted
  abstract highlighted: OutputEmitterRef<HighlightResult | AutoHighlightResult>;


  constructor() {
    effect((onCleanup) => {
      const code: string = this.code();
      const requestId = ++this._highlightRequestId;
      let active = true;

      onCleanup(() => {
        active = false;
      });

      // Set code text before highlighting
      this.setTextContent(code || '');

      if (!code) {
        this.highlightResult.set(null);

        return;
      }

      void this._pendingTasks.run(() => this.highlightElement(code)).then((res) => {
        if (active && requestId === this._highlightRequestId) {
          this.highlightResult.set(res);
        }
      });
    });

    effect(() => {
      const res: AutoHighlightResult = this.highlightResult();
      this.setInnerHTML(res?.value);
      // Forward highlight response to the highlighted output
      this.highlighted.emit(res);
    });
  }

  protected abstract highlightElement(code: string): Promise<HighlightResult | AutoHighlightResult>;

  private setTextContent(content: string): void {
    this.scheduleDOMWrite(() =>
      this._nativeElement.textContent = content
    );
  }

  private setInnerHTML(content: string | null): void {
    this.scheduleDOMWrite(() =>
      this._nativeElement.innerHTML = trustedHTMLFromStringBypass(
        this._sanitizer.sanitize(SecurityContext.HTML, content) || ''
      )
    );
  }

  private scheduleDOMWrite(task: FrameRequestCallback): void {
    if (this._isPlatformBrowser && typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(task);
      return;
    }
    task(0);
  }
}
