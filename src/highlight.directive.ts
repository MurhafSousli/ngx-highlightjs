import { Directive, AfterViewInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';

import * as hljs from 'highlight.js';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit, OnDestroy {

  el: HTMLElement;
  domObs: MutationObserver;

  constructor(el: ElementRef, private renderer: Renderer2) {
    this.el = el.nativeElement;
  }

  highlight() {

    const codeElements = this.el.querySelectorAll('pre code');
    if (codeElements.length) {
      Observable.from(codeElements)
        .take(1)
        .map((code: HTMLElement, i) => {
          /** Check if code element has only one text child (if it has more, then it is already highlighted) */
          if (code.childNodes.length === 1) {
            /** Highlight code using its language attribute */
            const highlightedCode = hljs.highlightAuto(code.innerText.trim()).value;
            // const highlightedCode = hljs.highlight(code.attributes['language'].nodeValue, code.innerText.trim()).value;

            /** Render the highlighted code */
            if (highlightedCode) {
              this.renderer.setProperty(code, 'innerHTML', highlightedCode);
            }
          }
        }).subscribe();
    }
  }

  ngAfterViewInit() {
    this.highlight();
    this.domObs = new MutationObserver(() => {
      this.highlight();
    });
    this.domObs.observe(this.el, { attributes: true, childList: true, characterData: true, subtree: true });
  }

  ngOnDestroy() {
    this.domObs.disconnect();
  }

}
