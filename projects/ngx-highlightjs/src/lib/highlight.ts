import {
  Directive,
  Input,
  Output,
  Inject,
  Optional,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  ElementRef,
  SecurityContext
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { animationFrameScheduler } from 'rxjs';
import { HighlightJS } from './highlight.service';
import { HIGHLIGHT_OPTIONS, HighlightOptions, HighlightResult } from './highlight.model';

@Directive({
  host: {
    '[class.hljs]': 'true'
  },
  selector: '[highlight]'
})
export class Highlight implements OnChanges {

  // Highlighted Code
  private readonly _nativeElement: HTMLElement;

  // Temp observer to observe when line numbers has been added to code element
  private _lineNumbersObs: any;

  // Highlight code input
  @Input('highlight') code!: string;

  // An optional array of language names and aliases restricting detection to only those languages.
  // The subset can also be set with configure, but the local parameter overrides the option if set.
  @Input() languages!: string[];

  // Show line numbers
  @Input() lineNumbers!: boolean;

  // Stream that emits when code string is highlighted
  @Output() highlighted = new EventEmitter<HighlightResult>();

  constructor(el: ElementRef,
              private _hljs: HighlightJS,
              private _sanitizer: DomSanitizer,
              @Optional() @Inject(HIGHLIGHT_OPTIONS) private _options: HighlightOptions) {
    this._nativeElement = el.nativeElement;
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
    // Set code text before highlighting
    this.setCode(code);
    this._hljs.highlightAuto(code, languages).subscribe((res: any) => {
      // Set highlighted code
      this.setCode(res.value);
      // Check if user want to show line numbers
      if (this.lineNumbers && this._options && this._options.lineNumbers) {
        this.addLineNumbers();
      }
      // Forward highlight response to the highlighted output
      this.highlighted.emit(res);
    });
  }

  private addLineNumbers() {
    // Clean up line numbers observer
    this.destroyLineNumbersObserver();
    animationFrameScheduler.schedule(() => {
      // Add line numbers
      this._hljs.lineNumbersBlock(this._nativeElement).subscribe();
      // If lines count is 1, the line numbers library will not add numbers
      // Observe changes to add 'hljs-line-numbers' class only when line numbers is added to the code element
      this._lineNumbersObs = new MutationObserver(() => {
        if (this._nativeElement.firstElementChild && this._nativeElement.firstElementChild.tagName.toUpperCase() === 'TABLE') {
          this._nativeElement.classList.add('hljs-line-numbers');
        }
        this.destroyLineNumbersObserver();
      });
      this._lineNumbersObs.observe(this._nativeElement, { childList: true });
    });
  }

  private destroyLineNumbersObserver() {
    if (this._lineNumbersObs) {
      this._lineNumbersObs.disconnect();
      this._lineNumbersObs = null;
    }
  }

  private setCode(content: string) {
    animationFrameScheduler.schedule(() =>
      this._nativeElement.innerHTML = this._sanitizer.sanitize(SecurityContext.HTML, content)
    );
  }
}

