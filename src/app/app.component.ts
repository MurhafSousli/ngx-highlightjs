import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ScrollbarComponent } from 'ngx-scrollbar';
import * as Autosize from 'autosize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  bashCode = '$ npm install --save ngx-highlightjs';

  tsCode = `import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  imports: [
    HighlightModule.forRoot({ theme: 'agate' })
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

  code: string;

  @ViewChild('textEl') text: ElementRef;
  @ViewChild('textScrollbar') textScrollbar: ScrollbarComponent;

  ngOnInit() {
    this.code = this.tsCode;
    Autosize(this.text.nativeElement);

    /** Update scrollbar on textarea resize */
    this.text.nativeElement.addEventListener('autosize:resized', () => this.textScrollbar.update());

    /** Update textarea size */
    this.updateTextareaSize();
  }

  setCode(code: string) {
    this.code = code;
    this.updateTextareaSize();
  }

  updateTextareaSize() {
    /** Must give a timeout before updating textarea */
    setTimeout(() => {
      Autosize.update(this.text.nativeElement);
    }, 50);
  }
}
