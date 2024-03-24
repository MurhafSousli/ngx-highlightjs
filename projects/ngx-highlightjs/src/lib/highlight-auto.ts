import { Directive, Input, Output, signal, input, EventEmitter, WritableSignal, InputSignal } from '@angular/core';
import type { AutoHighlightResult } from 'highlight.js';
import { HighlightBase } from './highlight-base';

@Directive({
  standalone: true,
  selector: '[highlightAuto]',
  providers: [{ provide: HighlightBase, useExisting: HighlightAuto }],
  host: {
    '[class.hljs]': 'true'
  }
})
export class HighlightAuto extends HighlightBase {

  // Code to highlight
  code: InputSignal<string> = input(null, { alias: 'highlightAuto' });

  // Highlighted result
  highlightResult: WritableSignal<AutoHighlightResult> = signal(null);

  // An optional array of language names and aliases restricting detection to only those languages.
  // The subset can also be set with configure, but the local parameter overrides the option if set.
  @Input() languages!: string[];

  // Stream that emits when code string is highlighted
  @Output() highlighted: EventEmitter<AutoHighlightResult> = new EventEmitter<AutoHighlightResult>();

  protected async highlightElement(code: string): Promise<void> {
    const res: AutoHighlightResult = await this._hljs.highlightAuto(code, this.languages);
    this.highlightResult.set(res);
  }
}

