<p align="center">
  <img height="200px" width="200px" style="text-align: center" src="https://cdn.rawgit.com/MurhafSousli/ngx-highlightjs/b8b00ec3/src/assets/logo.svg">
  <h1 align="center">Angular Highlight.js</h1>
</p>

[![Demo](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://ngx-highlight.netlify.com/)
[![Stackblitz](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-highlightjs)
[![npm](https://img.shields.io/npm/v/ngx-highlightjs.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-highlightjs)
[![tests](https://github.com/MurhafSousli/ngx-highlightjs/workflows/tests/badge.svg)](https://github.com/MurhafSousli/ngx-highlightjs/actions?query=workflow%3Atests)
[![Downloads](https://img.shields.io/npm/dt/ngx-highlightjs.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-highlightjs)
[![Monthly Downloads](https://img.shields.io/npm/dm/ngx-highlightjs.svg)](https://www.npmjs.com/package/ngx-highlightjs)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-highlightjs.svg)](https://bundlephobia.com/result?p=ngx-highlightjs)
[![License](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

Instant code highlighting, auto-detect language, super easy to use
___

## Table of Contents

- [Live Demo](https://ngx-highlight.netlify.com/) | [Stackblitz](https://stackblitz.com/edit/ngx-highlightjs)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Issues](#issues)
- [Author](#author)
- [More plugins](#more-plugins)

<a name="installation"/>

## Installation

Install with **NPM**

```bash
npm i ngx-highlightjs
```

<a name="usage"/>

## Usage

### Import `HighlightModule` in your app

```typescript
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@NgModule({
  imports: [
    HighlightModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ],
})
export class AppModule { }
```

 > Note: This will add highlight.js library including all languages to your bundle.

To avoid import everything from highlight.js library, you should import each language you want to highlight manually.

### Import only the core library and the needed highlighting languages

```typescript
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
 
@NgModule({
  imports: [
    HighlightModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml')
        }
      }
    }
  ],
})
export class AppModule { }
```

### HighlightOptions API

| Name              | Description                                                                                                             |
|-------------------|-------------------------------------------------------------------------------------------------------------------------|
| fullLibraryLoader | A function that returns a promise that loads `highlight.js` full script                                                 |
| coreLibraryLoader | A function that returns a promise that loads `highlight.js` core script                                                 |
| lineNumbersLoader | A function that returns a promise that loads `line-numbers` script which adds line numbers to the highlight code        |
| languages         | The set of languages to register.                                                                                       |
| config            | Set highlight.js config, see [configure-options](http://highlightjs.readthedocs.io/en/latest/api.html#configure-option) |


 > **NOTE:** Since the update of highlight.js@v10.x.x, should use `coreLibraryLoader: () => import('highlight.js/lib/core')` instead of `coreLibraryLoader: () => import('highlight.js/lib/highlight')`

### Import highlighting theme

Import highlight.js theme from the node_modules directory in `angular.json`

```
"styles": [
  "styles.css",
  "../node_modules/highlight.js/styles/github.css",
]
```

Or import it in `src/style.scss`

```css
@import '~highlight.js/styles/github.css';
```

_[List of all available themes from highlight.js](https://github.com/isagalaev/highlight.js/tree/master/src/styles)_

### Use highlight directive

The following line will highlight the given code and append it to the host element

```html
<pre><code [highlight]="code"></code></pre>
```

[Demo stackblitz](https://stackblitz.com/edit/ngx-highlightjs)

## Options

| Name              | Type            | Description                                                                                                |
|-------------------|-----------------|------------------------------------------------------------------------------------------------------------|
| **[highlight]**   | string          | Accept code string to highlight, default `null`                                                            |
| **[languages]**   | string[]        | An array of language names and aliases restricting auto detection to only these languages, default: `null` |
| **[lineNumbers]** | boolean         | A flag that indicates adding line numbers to highlighted code element                                      |
| **(highlighted)** | HighlightResult | Stream that emits the result object when element is highlighted                                            |


### NOTE

In Angular 10, when building your project, you might get a warning `WARNING in ... CommonJS or AMD dependencies can cause optimization bailouts.`

To avoid this warning, add the following in your `angular.json`
```json
{
  "projects": {
    "project-name": {
      "architect": {
        "build": {
          "options": {
            "allowedCommonJsDependencies": [
              "highlight.js"
            ]
          }
        }
      }
    }
  }
}
```
Read more about [CommonJS dependencies configuration](https://angular.io/guide/build#configuring-commonjs-dependencies)

## Plus package

In version >= 4, a new sub-package were added with the following features:

- Highlight gists using gists API
- Highlight code directly from URL

### Usage

```typescript
import { HighlightPlusModule } from 'ngx-highlightjs/plus';
 
@NgModule({
  imports: [
    HighlightPlusModule
  ]
})
export class AppModule {
}
```

### Highlight a gist file

1. Use `[gist]` directive with the gist id to get the response through the output `(gistLoaded)`.
2. Once `(gistLoaded)` emits, you will get access to the gist response.
3. Use `gistContent` pipe to extract the file content from gist response using gist file name.

**Example:**

```html
<pre [gist]="gistId" (gistLoaded)="gist = $event">
  <code [highlight]="gist | gistContent: 'main.js'"></code>
</pre>
```

### Highlight all gist files

To loop over `gist?.files`, use `keyvalue` pipe to pass file name into `gistContent` pipe.

**Example:**

```html
<ng-container [gist]="gistId" (gistLoaded)="gist = $event">
  <pre *ngFor="let file of gist?.files | keyvalue">
    <code [highlight]="gist | gistContent: file.key"></code>
  </pre>
</ng-container>
```

### Highlight code from URL directly

Use the pipe `codeFromUrl` with the `async` pipe together to get the code text from a raw URL.

**Example:**

```html
<pre>
  <code [highlight]="codeUrl | codeFromUrl | async"></code>
</pre>
``` 

<a name="development"/>

## Development

This project uses Angular CLI to build the package.

```bash
$ ng build ngx-highlightjs
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

- [ngx-scrollbar](https://github.com/MurhafSousli/ngx-ngx-scrollbar)
- [ngx-sharebuttons](https://github.com/MurhafSousli/ngx-sharebuttons)
- [ngx-gallery](https://github.com/MurhafSousli/ngx-gallery)
- [ngx-progressbar](https://github.com/MurhafSousli/ngx-progressbar)
- [ngx-scrollbar](https://github.com/MurhafSousli/ngx-scrollbar)
- [ngx-bar-rating](https://github.com/MurhafSousli/ngx-bar-rating)
- [ngx-disqus](https://github.com/MurhafSousli/ngx-disqus)
- [ngx-wordpress](https://github.com/MurhafSousli/ngx-wordpress)
- [ngx-highlightjs](https://github.com/MurhafSousli/ngx-highlightjs)
- [ngx-teximate](https://github.com/MurhafSousli/ngx-teximate)
