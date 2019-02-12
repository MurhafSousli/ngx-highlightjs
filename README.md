<p align="center">
  <img height="200px" width="200px" style="text-align: center" src="https://cdn.rawgit.com/MurhafSousli/ngx-highlightjs/b8b00ec3/src/assets/logo.svg">
  <h1 align="center">Angular Highlight.js</h1>
</p>

[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ngx-highlightjs/)
[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-highlightjs)
[![npm](https://img.shields.io/npm/v/ngx-highlightjs.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-highlightjs)
[![Build Status](https://travis-ci.org/MurhafSousli/ngx-highlightjs.svg?branch=master)](https://www.npmjs.com/package/ngx-highlightjs)
[![npm](https://img.shields.io/npm/dt/ngx-highlightjs.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-highlightjs)
[![npm](https://img.shields.io/npm/dm/ngx-highlightjs.svg)](https://www.npmjs.com/package/ngx-highlightjs)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-highlightjs.svg)](https://bundlephobia.com/result?p=ngx-highlightjs)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

Instant code highlighting, auto-detect language, super easy to use
___

## Table of Contents

- [Live Demo](https://MurhafSousli.github.io/ngx-highlightjs/) | [Stackblitz](https://stackblitz.com/edit/ngx-highlightjs)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Issues](#issues)
- [Author](#author)
- [More plugins](#more-plugins)

<a name="installation"/>

## Installation

**NPM**

```bash
$ npm install -S ngx-highlightjs highlight.js
```

**YARN**

```bash
$ yarn add ngx-highlightjs highlight.js
```

<a name="usage"/>

## Usage

### OPTION 1: Import `HighlightModule` in the root module

 > Note: this will include the whole library in your main bundle

```ts
import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

/**
 * Import every language you wish to highlight here
 * NOTE: The name of each language must match the file name its imported from
 */
export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'scss', func: scss},
    {name: 'xml', func: xml}
  ];
}

@NgModule({
  imports: [
    // ...
    HighlightModule.forRoot({
      languages: hljsLanguages
    })
  ]
})
export class AppModule { }
```

`forRoot(options: HighlightOptions)` Accepts options parameter which have the following properties:

- **languages**: The set of languages to register.
- **config**: Configures global options, see [configure-options](http://highlightjs.readthedocs.io/en/latest/api.html#configure-options).

### OPTION 2: Import `HighlightModule` in a feature module

You probably don't want to load this library in the root module, you can lazy load it by importing it in your feature module, however Highlight.js languages has to be registered in the root module.

```ts
import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

/**
 * Import every language you wish to highlight here
 * NOTE: The name of each language must match the file name its imported from
 */
export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'scss', func: scss},
    {name: 'xml', func: xml}
  ];
}

@NgModule({
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: hljsLanguages,
        config: { ... }            // <= Optional
      }
    }
  ]
})
export class AppModule { }
```

After Highlight.js languages are registered, just import `HighlightModule` in the feature module

```ts
@NgModule({
  imports: [
    // ...
    HighlightModule
  ]
})
export class FeatureModule { }
```


### Import highlighting theme

```css
@import '~highlight.js/styles/github.css';
```

You can also lazy load the theme by importing it in your lazy loaded component stylesheet, 

```ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lazy-loaded',
  templateUrl: './lazy-loaded.component.html',
  styleUrls: [`
    @import '~highlight.js/styles/github.css';
  `],
  encapsulation: ViewEncapsulation.None         // <= Add this
})
export class LazyLoadedComponent  {
}
```

 > Note: if you have multiple components that use `HighlightModule`, then it is better to import the theme in the global styles `src/styles.css` 

_[List of all available themes from highlight.js](https://github.com/isagalaev/highlight.js/tree/master/src/styles)_

## `highlight` directive

Highlight host element

```html
<pre><code [highlight]="someCode"></code></pre>
```

Check this [stackblitz](https://stackblitz.com/edit/ngx-highlightjs)

## Options

- **[highlight]**: (string), Accept code string to highlight, default `null`

- **[languages]**: (string[]), an array of language names and aliases restricting auto detection to only these languages, default: `null`

- **(highlighted)**: Stream that emits `HighlightResult` object when element is highlighted.

## `highlightChildren` directive

Highlight children code elements

```html
<!-- Highlight child elements with 'pre code' selector -->
<div highlightChildren>
  <pre><code [textContent]="htmlCode"></code></pre>
  <pre><code [textContent]="tsCode"></code></pre>
  <pre><code [textContent]="cssCode"></code></pre>
</div>
```

Check this [stackblitz](https://stackblitz.com/edit/ngx-highlightjs-children)

- Highlight children custom elements by selector

```html
<!-- Highlight child elements with custom selector -->
<div highlightChildren="section p">
  <section><p [textContent]="pythonCode"></p></section>
  <section><p [textContent]="swiftCode"></p></section>
</div>
```

## `HighlightJS` service

Use this service if you wish to access the [Official HighlightJS API](http://highlightjs.readthedocs.io/en/latest/api.html#).

<a name="development"/>

## Development

This project uses Angular CLI to build the package.

```bash
$ ng build ngx-highlightjs --prod
```

<a name="issues"/>

## Issues

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ngx-highlightjs/issues).

<a name="author"/>

## Author

 **Murhaf Sousli**

- [github/murhafsousli](https://github.com/MurhafSousli)
- [twitter/murhafsousli](https://twitter.com/MurhafSousli)

<a name="more-plugins"/>

## More plugins

- [ngx-sharebuttons](https://github.com/MurhafSousli/ngx-sharebuttons)
- [ngx-gallery](https://github.com/MurhafSousli/ngx-gallery)
- [ngx-progressbar](https://github.com/MurhafSousli/ngx-progressbar)
- [ngx-scrollbar](https://github.com/MurhafSousli/ngx-scrollbar)
- [ngx-bar-rating](https://github.com/MurhafSousli/ngx-bar-rating)
- [ngx-disqus](https://github.com/MurhafSousli/ngx-disqus)
- [ngx-wordpress](https://github.com/MurhafSousli/ngx-wordpress)
- [ngx-highlightjs](https://github.com/MurhafSousli/ngx-highlightjs)
- [ngx-teximate](https://github.com/MurhafSousli/ngx-teximate)
