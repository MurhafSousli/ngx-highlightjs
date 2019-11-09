import { Directive, Input, Output, OnChanges, SimpleChanges, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { HighlightJS } from './highlight.service';
import { HighlightResult } from './highlight.model';

@Directive({
  host: {
    '[class.hljs]': 'true',
    '[innerHTML]': 'highlightedCode || code'
  },
  selector: '[highlight]'
})
export class Highlight implements OnChanges {

  // Highlighted Code
  highlightedCode!: string;

  // Highlight code input
  @Input('highlight') code!: string;

  // An optional array of language names and aliases restricting detection to only those languages.
  // The subset can also be set with configure, but the local parameter overrides the option if set.
  @Input() languages!: string[];

  // Stream that emits when code string is highlighted
  @Output() highlighted = new EventEmitter<HighlightResult>();

  constructor(private _hljs: HighlightJS, private _cd: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.code &&
      changes.code.currentValue &&
      changes.code.currentValue !== changes.code.previousValue
    ) {
      this.highlightElement(this.code, this.languages);
    }
  }

  /**
   * Highlighting with language detection and fix markup.
   * @param code Accepts a string with the code to highlight
   * @param languages An optional array of language names and aliases restricting detection to only those languages.
   * The subset can also be set with configure, but the local parameter overrides the option if set.
   */
  highlightElement(code: string, languages?: string[]): void {
    this._hljs.highlightAuto(code, languages).subscribe((res: any) => {
      this.highlightedCode = res.value;
      this._cd.detectChanges();
      this.highlighted.emit(res);
    });
  }
}

