import { Directive, ElementRef, Renderer2, OnDestroy, Input, Output, EventEmitter, OnInit, HostBinding } from '@angular/core';
import { HighlightService } from './highlight.service';
import { HighlightResult } from './highlight.model';
import { from } from 'rxjs/observable/from';
import { map, take, filter, tap } from 'rxjs/operators';

declare const hljs: any;

/** There are 2 ways to higlight a code
 *  1 - using the [code] input (default) <code highlight [code]="yourCode"></code>
 *  2 - using element text content <code> {{yourCode}} </code>
 */

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements OnInit, OnDestroy {

  el: HTMLElement;
  domObs: MutationObserver;
  code: string;
  @Input() highlight: string;
  @Input() language: string[];
  @Input('code')
  set setCode(code: string) {
    this.code = code;
    this.hl.ready$.pipe(
      filter(ready => ready),
      take(1),
      tap(() => this.highlightElement(this.el, code))
    ).subscribe();
  }

  @Output() highlighted = new EventEmitter<HighlightResult>();

  @HostBinding('class.hljs') hljsClass = true;

  constructor(el: ElementRef, private renderer: Renderer2, private hl: HighlightService) {
    this.el = el.nativeElement;
  }

  ngOnInit() {

    /** Acitvate MutationObserver if `auto` option is true and `[code]` input is not used
     * This will highlight using the text content */
    if (!this.code && this.hl.options.auto) {

      this.hl.ready$.pipe(
        filter(ready => ready),
        take(1),
        tap(() => {
          this.highlightTextContent();

          /** Highlight when text content changes */
          this.domObs = new MutationObserver(() => this.highlightTextContent());
          this.domObs.observe(this.el, { childList: true, subtree: true });
        })
      ).subscribe();
    }
  }

  /** Highlight using element text content */
  highlightTextContent() {
    if (!this.highlight) {
      if (this.el.tagName.toLowerCase() === 'code') {
        this.highlightElement(this.el, this.el.innerText.trim());
      } else {
        console.warn(`[HighlightDirective]: Use 'highlight' on <code> element only`);
      }
    } else if (this.highlight === 'all') {
      this.highlightChildren(this.el, 'pre code');
    } else {
      this.highlightChildren(this.el, this.highlight);
    }
  }

  /** Highlight a code block */
  highlightElement(el: HTMLElement, code: string) {

    const res: HighlightResult = hljs.highlightAuto(code, this.language);
    if (res.value !== el.innerHTML) {
      this.renderer.setProperty(el, 'innerHTML', res.value);
      this.highlighted.emit(res);
    }
  }

  /** Highlight multiple code blocks */
  highlightChildren(el: HTMLElement, selector: string) {

    const codeElements = el.querySelectorAll(selector);

    /** highlight children with the same selector */
    from(codeElements).pipe(
      filter((code: HTMLElement) => code.childNodes.length === 1 && code.childNodes[0].nodeName === '#text'),
      map((codeElement: HTMLElement) => this.highlightElement(codeElement, codeElement.innerText.trim())),
      take(1)
    ).subscribe();
  }

  ngOnDestroy() {
    /** Disconnect MutationObserver */
    if (!this.code && this.hl.options.auto) {
      this.domObs.disconnect();
    }
  }
}
