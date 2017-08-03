import { Directive, AfterViewInit, ElementRef, Renderer2, OnDestroy, Input } from '@angular/core';

declare const hljs: any;

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

@Directive({
  selector: '[highlight]'
})
export class HighlightUmdDirective implements AfterViewInit, OnDestroy {

  el: HTMLElement;
  domObs: MutationObserver;
  highlighter$ = new Subject<any>();

  @Input() highlight: string;
  @Input() hlAuto = true;
  @Input() hlDelay = 200;

  constructor(el: ElementRef, private renderer: Renderer2) {
    this.el = el.nativeElement;
  }

  ngAfterViewInit() {

    let codeElements: any = [];

    this.highlighter$
      .delay(this.hlDelay)
      .skipWhile(() => !isReady())
      .do(() => {
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

        Observable.from(codeElements)
          .take(1)
          .filter((code: HTMLElement) => (code.childNodes.length === 1 && code.childNodes[0].nodeName === '#text'))
          .map((code: HTMLElement) => {

            /** Highlight only if content is a plain text */
            const highlightedCode = hljs.highlightAuto(code.innerText.trim()).value;

            /** Render the highlighted code */
            if (highlightedCode !== code.innerHTML) {
              this.renderer.setProperty(code, 'innerHTML', highlightedCode);
            }
          }).subscribe();

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

function isReady() {
  return typeof hljs !== 'undefined';
}
