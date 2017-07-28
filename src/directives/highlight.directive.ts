import { Directive, AfterViewInit, ElementRef, Renderer2, OnDestroy, Input } from '@angular/core';

/** Rollup: does not allow this "import * as" otherwise highlight.js script would have merged with the module */
// import * as hljs from 'highlight.js';

declare const hljs: any;

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit, OnDestroy {

  el: HTMLElement;
  domObs: MutationObserver;
  highlighter$ = new Subject<any>();

  @Input('highlight') highlight;
  @Input() hlAuto = true;
  @Input() hlDelay = 200;

  constructor(el: ElementRef, private renderer: Renderer2) {
    this.el = el.nativeElement;
  }

  ngAfterViewInit() {

    if (typeof hljs === 'undefined') {
      throw new Error('Highlight.js is not loaded.');
    }

    let codeElements: any = [];

    this.highlighter$.delay(this.hlDelay)
      .switchMap(() => {

        switch (this.highlight) {
          case 'all':
            codeElements = this.el.querySelectorAll('pre code');
            break;
          case '':
            codeElements = [this.el];
            break;
          default:
            codeElements = this.el.querySelectorAll(this.highlight);
        }

        return Observable.from(codeElements)
          .take(1)
          .map((code: HTMLElement) => {

            /** Highlight only If content is plain text */
            if (code.childNodes.length === 1 && code.childNodes[0].nodeName === '#text') {

              const highlightedCode = hljs.highlightAuto(code.innerText.trim()).value;

              /** Render the highlighted code */
              if (highlightedCode) {
                this.renderer.setProperty(code, 'innerHTML', highlightedCode);
              }

            }
          });
      }).subscribe();

    this.highlighter$.next();

    /** Auto highlight on changes */
    if (this.hlAuto) {
      this.domObs = new MutationObserver(() => this.highlighter$.next());
      this.domObs.observe(this.el, { childList: true, subtree: true });
    }
  }

  ngOnDestroy() {
    if (this.hlAuto) {
      this.domObs.disconnect();
    }
    this.highlighter$.unsubscribe();
  }

}
