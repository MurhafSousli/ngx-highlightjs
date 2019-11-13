import {
  Directive,
  Input,
  Output,
  Inject,
  Optional,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  ElementRef
} from '@angular/core';
import { HighlightJS } from './highlight.service';
import { HIGHLIGHT_OPTIONS, HighlightOptions, HighlightResult } from './highlight.model';
import { animationFrameScheduler } from 'rxjs';

@Directive({
  host: {
    '[class.hljs]': 'true'
  },
  selector: '[highlight]'
})
export class Highlight implements OnChanges {

  // Highlighted Code
  private readonly _nativeElement: HTMLElement;

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
        animationFrameScheduler.schedule(() => {
          // Add line numbers
          this._hljs.lineNumbersBlock(this._nativeElement).subscribe();
          // If code lines is only 1, the library will not add numbers
          // Observe changes to add 'hljs-line-numbers' class only when line numbers is added to the code element
          let obs = new MutationObserver(() => {
            if (this._nativeElement.firstElementChild.tagName.toUpperCase() === 'TABLE') {
              this._nativeElement.classList.add('hljs-line-numbers');
            }
            obs.disconnect();
            obs = null;
          });
          obs.observe(this._nativeElement, { childList: true });
        });
      }
      // Forward highlight response to the highlighted output
      this.highlighted.emit(res);
    });
  }

  private setCode(content: string) {
    animationFrameScheduler.schedule(() => this._nativeElement.innerHTML = content);
  }
}

