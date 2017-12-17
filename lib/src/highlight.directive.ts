import { Directive, ElementRef, Renderer2, OnDestroy, Input, Output, EventEmitter, OnInit, HostBinding } from '@angular/core';
import { HighlightService } from './highlight.service';
import { HighlightResult } from './highlight.model';
import { from } from 'rxjs/observable/from';
import { map, take, filter, tap } from 'rxjs/operators';

/** Highlight.js library */
declare const hljs: any;

/** There are 2 ways to set the code
 *  1 - using the [code] input (default) <code highlight [code]="yourCode"></code>
 *  2 - using element text content <code> {{yourCode}} </code>
 */

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements OnInit, OnDestroy {

  /** Element ref */
  el: HTMLElement;

  /** Highlight code from text content on changes */
  domObs: MutationObserver;

  /** Code text */
  code: string;

  /** Highlight, can be use to select highlight mode */
  @Input() highlight: string;

  /** Highlight code directly */
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

    /** If code is undefined, highlight using element text content */
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
      /** <code highlight [textContent]="code"></code> */
      if (this.el.tagName.toLowerCase() === 'code') {
        this.highlightElement(this.el, this.el.innerText.trim());
      } else {
        console.warn(`[HighlightDirective]: Use 'highlight' on <code> elements only`);
      }
    } else if (this.highlight === 'all') {
      /** <div highlight="all">
       *    <pre><code [textContent]="code"></code></pre>
       *    <pre><code [textContent]="code"></code></pre>
       *  </div>
       */
      this.highlightChildren(this.el, 'pre code');
    } else {
      /** <div highlight="section code">
       *    <section><code [textContent]="code"></code></section>
       *    <section><code [textContent]="code"></code></section>
       *  </div>
       */
      this.highlightChildren(this.el, this.highlight);
    }
  }

  /** Highlight single element */
  highlightElement(el: HTMLElement, code: string) {

    const res: HighlightResult = hljs.highlightAuto(code);
    if (res.value !== el.innerHTML) {
      this.renderer.setProperty(el, 'innerHTML', res.value);
      this.highlighted.emit(res);
    }
  }

  /** Highlight children */
  highlightChildren(el: HTMLElement, selector: string) {

    const codeElements = el.querySelectorAll(selector);

    /** highlight all children with the same selector */
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
