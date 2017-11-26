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

  constructor(@Optional() @Inject(OPTIONS) options: HighlightOptions) {

    this.options = {...this.options, ...options};

    /** Load hljs script and style only once */
    this.loadScript();
    this.loadTheme();
  }

  loadScript() {
    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.onload = () => {
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
