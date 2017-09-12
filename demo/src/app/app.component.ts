import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  code;

  bashCode = '$ npm install --save ngx-highlightjs';

  tsCode = `import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  imports: [
    HighlightModule.forRoot({ theme: 'monokai-sublime' })
  ]
})
export class AppModule { }`;

  htmlCode = `<!-- Highlight element directly -->
<pre><code highlight [code]="someCode"></code></pre>
<pre><code highlight [textContent]="someCode"></code></pre>
<pre><code highlight>import { HighlightModule } from 'ngx-highlightjs';</code></pre>

<!-- Highlight all child elements of type <pre><code> -->
<div highlight="all">
  <pre><code>import { HighlightModule } from 'ngx-highlightjs';</code></pre>
  <pre><code [textContent]="tsCode"></code></pre>
  <pre><code [textContent]="cssCode"></code></pre>
</div>

<!-- Highlight custom child elements -->
<div highlight="section code">
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


  ngOnInit() {
    this.code = this.tsCode;
  }

}
