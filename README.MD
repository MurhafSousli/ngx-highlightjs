# Angular Highlight.js Module

Super easy to use, auto-detect language

## Installation

To install this library, run:

```bash
$ npm install ngx-highlightjs --save
```

## Usage

Import it from module `AppModule`:

```typescript

// Import your library
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  imports: [
    // ...
    HighlightModule
  ]
})
export class AppModule { }
```

Import highlight.js style from the global style `style.scss`

```scss
@import '~highlight.js/styles/github.css';
```

Once your import the module and the style, you will be able to use in your Angular application:

```xml
<div highlight class="wrapper">
  <pre><code [innerHtml]="someCode"></code></pre>
  <pre><code [innerHtml]="anotherCode"></code></pre>
</div>
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Murhaf Sousli](mailto:murhafsousli@gmail.com)
