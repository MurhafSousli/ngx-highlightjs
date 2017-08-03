import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Injectable, Renderer2 } from '@angular/core';
import { HighlightOptions } from '../models/highlight-options';

import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

declare const hljs: any;

@Injectable()
export class HighlightService {

  options: HighlightOptions = {
    theme: 'github',
    path: 'assets/lib/hljs',
    auto: true
  };

  loadScript$ = new Subject();
  highlighter$ = new Subject();
  ready$ = new Subject();

  renderer: Renderer2;

  constructor(options: HighlightOptions) {

    this.options = Object.assign({}, this.options, options);

    /** Load hljs script and style only once */
    this.loadScript$
      .take(1)
      .do((renderer: Renderer2) => {
        this.renderer = renderer;
        this.loadScript();
        this.loadTheme();
      }).subscribe();

    /** highlight when script is ready */
    Observable.zip(this.ready$, this.highlighter$, (x, item: any) => {

      /** highlight one item or many elements */
      let codeElements: any = [];

      switch (item.type) {
        case 'all':
          codeElements = item.el.querySelectorAll('pre code');
          break;
        case '':
          codeElements = [item.el];
          break;
        default:
          codeElements = item.el.querySelectorAll(this.highlight);
      }

      /** highlight all code elements */
      Observable.from(codeElements)
        .filter((code: HTMLElement) => code.childNodes.length === 1 && code.childNodes[0].nodeName === '#text')
        .map((code: HTMLElement) => {

          /** Highlight only if content is a plain text */
          const highlightedCode = hljs.highlightAuto(code.innerText.trim()).value;

          /** Render the highlighted code */
          if (highlightedCode !== code.innerHTML) {
            this.renderer.setProperty(code, 'innerHTML', highlightedCode);
          }
        }).subscribe();

    }).subscribe();

  }

  highlight(renderer: Renderer2, el: HTMLElement, type: string) {

    this.loadScript$.next(renderer);
    this.highlighter$.next({ el, type });
    if (isReady()) {
      this.ready$.next();
    }
  }

  loadScript() {
    const script = this.renderer.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.onload = () => {
      this.ready$.next();
    };
    script.src = `${this.options.path}/highlight.pack.js`;
    this.renderer.setAttribute(script, 'data-timestamp', new Date().getTime().toString());
    this.renderer.appendChild(document.body, script);
  }

  loadTheme() {
    const style = this.renderer.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = `${this.options.path}/styles/${this.options.theme}.css`;
    this.renderer.appendChild(document.body, style);
  }

}

function isReady() {
  return typeof hljs !== 'undefined';
}
