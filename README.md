<p align="center">
  <img height="200px" width="200px" style="text-align: center;" src="https://cdn.rawgit.com/MurhafSousli/ngx-highlightjs/master/assets/logo.svg">
  <h1 align="center">Angular Highlight.js</h1>
</p>

Super easy to use, auto highlight code and auto-detect language 

___
[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ngx-highlightjs/)
[![npm](https://img.shields.io/npm/v/ngx-highlightjs.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-highlightjs) 
[![Build Status](https://travis-ci.org/MurhafSousli/ngx-highlightjs.svg?branch=master)](https://www.npmjs.com/package/ngx-highlightjs) 
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)


## Installation

1. Install it with npm

```bash
$ npm install --save ngx-highlightjs
```

2. Head to [highlight.js download page](https://highlightjs.org/download/) and get your custom package bundle including only the languages you need.

3. Create new folder in `src/assets/lib/hljs` and extract the downloaded zip file there.


### SystemJS

If you are using SystemJS, you should also adjust your configuration to point to the UMD bundle.

In your systemjs config file, map needs to tell the System loader where to look for `ngx-highlightjs`:
```js
map: {
  'ngx-highlightjs': 'node_modules/ngx-highlightjs/bundles/ngx-highlightjs.umd.js',
}
```
Import `HighlightUmdModule`, you will need to import highlight.js script and style manually, Here is a working [plunker](https://plnkr.co/edit/OULKGeN9jG1KHREYZ4YF?p=preview).

---

## Usage

Import `HighlightModule` library from any module:

```ts
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  imports: [
    // ...
    HighlightModule.forRoot()
  ]
})
export class AppModule { }
```

The function **forRoot** accepts 2 optional parameters, `forRoot(theme?, path?)`

 - **theme**: theme name without the extension, default: `'github'`
 - **path**: package directory path, default: `'assets/lib/hljs'`

 Choose highlighting theme:
```ts
    HighlightModule.forRoot('monokai-sublime');
```
_[List of all available themes from highlight.js](https://github.com/isagalaev/highlight.js/tree/master/src/styles)_

 Import the library from a custom path
 ```ts
    HighlightModule.forRoot('monokai-sublime', 'assets/js/highlight-js');
 ```

---

Now you can use the directive `highlight`, you can:

 - Highlight a code element

```html
<!-- Highlight target element -->
<pre><code highlight [textContent]="someCode"></code></pre>
```
 - Highlight all child code elements

```html
<!-- Highlight child elements of type <pre><code> -->
<div highlight="all">
  <pre><code [textContent]="htmlCode"></code></pre>
  <pre><code [textContent]="tsCode"></code></pre>
  <pre><code [textContent]="cssCode"></code></pre>
</div>
```
 - Highlight custom elements

```html
<!-- Highlight custom child elements -->
<div highlight="section code">
  <section><code [textContent]="pythonCode"></code></section>
  <section><code [textContent]="swiftCode"></code></section>
</div>
```

## Options

- Highlight element(s)

  **[highlight]**: string, default `''`

  * Use just `highlight` on the element to highlight it.
  * Use `highlight="all"` to highlight all child code elements.
  * Use `highlight="{selector}"` to highlight custom child elements.

- Auto-highlight on changes

  **[hlAuto]**: boolean, default `true`;

- Highlight delay 

  **[hlDelay]**: number, default `200` ms;

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## Issues

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ngx-highlightjs/issues). I am excited to see what the community thinks of this project, and I would love your input!

## Author

 **[Murhaf Sousli](http://murhafsousli.com)**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)

