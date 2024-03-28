import {
  Directive,
  Input,
  Output,
  signal,
  booleanAttribute,
  input,
  EventEmitter,
  InputSignal,
  WritableSignal
} from '@angular/core';
import type { HighlightResult } from 'highlight.js';
import { HighlightBase } from './highlight-base';

@Directive({
  standalone: true,
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

  // An optional array of language names and aliases restricting detection to only those languages.
  // The subset can also be set with configure, but the local parameter overrides the option if set.
  @Input({ required: true }) language: string;

  // An optional flag, when set to true it forces highlighting to finish even in case of detecting
  // illegal syntax for the language instead of throwing an exception.
  @Input({ transform: booleanAttribute }) ignoreIllegals: boolean;

  // Stream that emits when code string is highlighted
  @Output() highlighted: EventEmitter<HighlightResult> = new EventEmitter<HighlightResult>();

  async highlightElement(code: string): Promise<void> {
    const res: HighlightResult = await this._hljs.highlight(code, {
      language: this.language,
      ignoreIllegals: this.ignoreIllegals
    });
    this.highlightResult.set(res);
  }
}
