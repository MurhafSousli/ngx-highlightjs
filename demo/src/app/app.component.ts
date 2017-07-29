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
    HighlightModule.forRoot('monokai-sublime')
  ]
})
export class AppModule { }`;

  htmlCode = `<!-- Highlight target element -->
<pre><code highlight [textContent]="someCode"></code></pre>
<div [textContent]="anotherCode"></div>

<!-- Highlight child elements of type <pre><code> -->
<div highlight="all">
  <pre><code [textContent]="htmlCode"></code></pre>
  <pre><code [textContent]="tsCode"></code></pre>
  <pre><code [textContent]="cssCode"></code></pre>
</div>

<!-- Highlight custom child elements -->
<div highlight="section code">
  <section><code [textContent]="pythonCode"></code></section>
  <section><code [textContent]="swiftCode"></code></section>
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
