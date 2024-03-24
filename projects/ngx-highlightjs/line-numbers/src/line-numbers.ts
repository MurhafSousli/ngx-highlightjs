import {
  Directive,
  Input,
  inject,
  effect,
  numberAttribute,
  booleanAttribute,
  ElementRef,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HighlightJS, HighlightBase, HIGHLIGHT_OPTIONS, LineNumbersOptions } from 'ngx-highlightjs';

@Directive({
  standalone: true,
  selector: '[highlight][lineNumbers], [highlightAuto][lineNumbers]'
})
export class HighlightLineNumbers {

  private readonly _platform: object = inject(PLATFORM_ID);
  private readonly options: LineNumbersOptions = inject(HIGHLIGHT_OPTIONS)?.lineNumbersOptions;
  private readonly _hljs: HighlightJS = inject(HighlightJS);
  private readonly _highlight: HighlightBase = inject(HighlightBase);
  private readonly _nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  // Temp observer to observe when line numbers has been added to code element
  private _lineNumbersObs: MutationObserver;

  @Input({ transform: numberAttribute }) startFrom: number = this.options?.startFrom;

  @Input({ transform: booleanAttribute }) singleLine: boolean = this.options?.singleLine;

  constructor() {
    if (isPlatformBrowser(this._platform)) {
      effect(() => {
        if (this._highlight.highlightResult()) {
          this.addLineNumbers();
        }
      });
    }
  }

  private addLineNumbers(): void {
    // Clean up line numbers observer
    this.destroyLineNumbersObserver();
    requestAnimationFrame(async () => {
      // Add line numbers
      await this._hljs.lineNumbersBlock(this._nativeElement, {
        startFrom: this.startFrom,
        singleLine: this.singleLine
      });
      // If lines count is 1, the line numbers library will not add numbers
      // Observe changes to add 'hljs-line-numbers' class only when line numbers is added to the code element
      this._lineNumbersObs = new MutationObserver(() => {
        if (this._nativeElement.firstElementChild?.tagName.toUpperCase() === 'TABLE') {
          this._nativeElement.classList.add('hljs-line-numbers');
        }
        this.destroyLineNumbersObserver();
      });
      this._lineNumbersObs.observe(this._nativeElement, { childList: true });
    });
  }

  private destroyLineNumbersObserver(): void {
    if (this._lineNumbersObs) {
      this._lineNumbersObs.disconnect();
      this._lineNumbersObs = null;
    }
  }
}
