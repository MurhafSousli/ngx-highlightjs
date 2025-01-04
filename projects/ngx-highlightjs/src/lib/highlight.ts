import {
  Directive,
  signal,
  output,
  booleanAttribute,
  input,
  InputSignal,
  WritableSignal,
  OutputEmitterRef,
  InputSignalWithTransform
} from '@angular/core';
import type { HighlightResult } from 'highlight.js';
import { HighlightBase } from './highlight-base';

@Directive({
  selector: '[highlight]',
  providers: [{ provide: HighlightBase, useExisting: Highlight }],
  host: {
    '[class.hljs]': 'true'
  }
})
export class Highlight extends HighlightBase {

  // Code to highlight
  code: InputSignal<string> = input(null, { alias: 'highlight' });

  // Highlighted result
  highlightResult: WritableSignal<HighlightResult> = signal(null);

  // The language name highlight only one language.
  readonly language: InputSignal<string> = input.required<string>();

  // An optional flag, when set to true it forces highlighting to finish even in case of detecting
  // illegal syntax for the language instead of throwing an exception.
  readonly ignoreIllegals: InputSignalWithTransform<boolean, unknown> = input<boolean, unknown>(undefined, {
    transform: booleanAttribute
  });

  // Stream that emits when code string is highlighted
  highlighted: OutputEmitterRef<HighlightResult> = output<HighlightResult>();

  async highlightElement(code: string): Promise<void> {
    const res: HighlightResult = await this._hljs.highlight(code, {
      language: this.language(),
      ignoreIllegals: this.ignoreIllegals()
    });
    this.highlightResult.set(res);
  }
}
