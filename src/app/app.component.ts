import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { animationFrameScheduler } from 'rxjs';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  bashCode = `// Install with NPM
npm install -S ngx-highlightjs highlight.js

// Install with YARN
yarn add ngx-highlightjs highlight.js`;

  tsCode = `import { HighlightModule } from 'ngx-highlightjs';

import typescript from 'highlight.js/lib/languages/typescript';
import scss from 'highlight.js/lib/languages/scss';
import xml from 'highlight.js/lib/languages/xml';

export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'scss', func: scss},
    {name: 'xml', func: xml}
  ];
}

@NgModule({
  imports: [
    HighlightModule.forRoot({
      languages: hljsLanguages
    })
  ]
})
export class AppModule { }`;

  htmlCode = `<!-- Simple usage -->

<!-- Highlight element directly -->
<pre><code [highlight]="someCode"></code></pre>

<!-- Highlight all child elements with selector '<code>' -->
<div highlightChildren>
  <pre><code>import { HighlightModule } from 'ngx-highlightjs';</code></pre>
  <pre><code [textContent]="tsCode"></code></pre>
  <pre><code [textContent]="cssCode"></code></pre>
</div>

<!-- Highlight custom child elements with selector 'section code' -->
<div highlightChildren="section code">
  <section><code [textContent]="pythonCode"></code></section>
  <section><code>import { HighlightModule } from 'ngx-highlightjs';</code></section>
</div>`;

  scssCode = `pre {
  display: flex;
  height: 100%;
  word-wrap: normal;
  margin: 0;
  overflow-y: auto;
  code {
      flex: 1;
      padding: 24px;
      line-height: 1.8em;
      display: block;
      font-size: 0.9em;
  }
}`;

  code: string;

  theme = 'atom-one-dark';

  styles = [
    'vs',
    'rainbow',
    'dracula',
    'androidstudio',
    'agate',
    'zenburn',
    'agate',
    'color-brewer',
    'atom-one-dark',
    'atom-one-light',
    'github',
    'solarized-light',
    'solarized-dark',
    'railscasts',
    'tomorrow',
    'monokai-sublime',
    'mono-blue',
    'default',
  ];

  @ViewChild('textScrollbar') textScrollbar: NgScrollbar;
  @ViewChild('highlightScrollbar') highlightScrollbar: NgScrollbar;
  @ViewChild(CdkTextareaAutosize) textareaAutosize: CdkTextareaAutosize;

  ngOnInit() {
    this.setCode(this.tsCode);
  }

  setCode(code: string) {
    this.code = code;
    this.textareaAutosize.resizeToFitContent();
    setTimeout(() => {
      this.textScrollbar.update();
      this.highlightScrollbar.update();
    }, 300);
  }

  changeTheme() {
    let disablePreviousTheme;
    document.head.querySelectorAll('.codestyle').forEach((linkElement: HTMLLinkElement) => {
      const disabled = linkElement.href.substr(linkElement.href.lastIndexOf('/') + 1) !== `${this.theme}.css`;
      if (!linkElement.disabled) {
        disablePreviousTheme = linkElement;
      } else {
        linkElement.disabled = disabled;
      }
    });
    animationFrameScheduler.schedule(() => disablePreviousTheme.disabled = true);
  }

}
