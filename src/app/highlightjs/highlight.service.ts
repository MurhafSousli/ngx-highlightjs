import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HighlightOptions } from './highlight.model';
import { OPTIONS } from './highlight.token';

declare const hljs: any;

@Injectable()
export class HighlightService {

  options: HighlightOptions = {
    theme: 'github',
    path: 'assets/lib/hljs',
    auto: true
  };

  /** hljs script on load event */
  ready$ = new BehaviorSubject(false);

  constructor( @Optional() @Inject(OPTIONS) options: HighlightOptions) {

    this.options = { ...this.options, ...options };

    if (typeof hljs !== 'undefined') {
      /** hljs is loaded by the user */
      hljs.configure(this.options.config);
      this.ready$.next(true);
    } else {

      /** Load hljs script and style locally */
      this.loadScript();
      this.loadTheme();
    }
  }

  loadScript() {
    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.onload = () => {
      hljs.configure(this.options.config);
      this.ready$.next(true);
    };
    script.src = `${this.options.path}/highlight.pack.js`;
    document.head.appendChild(script);
  }

  loadTheme() {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = `${this.options.path}/styles/${this.options.theme}.css`;
    document.head.appendChild(style);
  }

}
