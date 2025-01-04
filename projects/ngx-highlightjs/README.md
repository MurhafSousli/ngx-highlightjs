<p align="center">
  <img height="200px" width="200px" style="text-align: center" src="https://cdn.rawgit.com/MurhafSousli/ngx-highlightjs/b8b00ec3/src/assets/logo.svg">
  <h1 align="center">Angular Highlight.js</h1>
</p>

[![Demo](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://ngx-highlight.netlify.app/)
[![Stackblitz](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-highlightjs)
[![npm](https://img.shields.io/npm/v/ngx-highlightjs.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-highlightjs)
[![tests](https://github.com/MurhafSousli/ngx-highlightjs/workflows/tests/badge.svg)](https://github.com/MurhafSousli/ngx-highlightjs/actions?query=workflow%3Atests)
[![codecov](https://codecov.io/gh/MurhafSousli/ngx-highlightjs/graph/badge.svg?token=JWAelEiLT1)](https://codecov.io/gh/MurhafSousli/ngx-highlightjs)
[![Downloads](https://img.shields.io/npm/dt/ngx-highlightjs.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-highlightjs)
[![Monthly Downloads](https://img.shields.io/npm/dm/ngx-highlightjs.svg)](https://www.npmjs.com/package/ngx-highlightjs)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-highlightjs.svg)](https://bundlephobia.com/result?p=ngx-highlightjs)
[![License](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

Instant code highlighting directives
___

## Table of Contents

- [Live Demo](https://ngx-highlight.netlify.app/) | [Stackblitz](https://stackblitz.com/edit/ngx-highlightjs)
- [Installation](#installation)
- [Usage](#usage)
  - [Lazy-load highlight.js script](#usage)
  - [Import highlight.js theme](#themes)
  - [Highlight usage](#highlight)
  - [HighlightAuto usage](#highlight-auto)
- [Line numbers addon usage](#line-numbers)
- [Plus package](#plus)
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

### Use `provideHighlightOptions` to provide highlight.js options in `app.config.ts`

```typescript
import { provideHighlightOptions } from 'ngx-highlightjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHighlightOptions({
      fullLibraryLoader: () => import('highlight.js')
    })
  ]
};
```

> Note: This includes the entire Highlight.js library with all languages.

You can also opt to load only the core script and the necessary languages.

### Importing Core Library and Languages

```typescript
import { provideHighlightOptions } from 'ngx-highlightjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'), // Optional, add line numbers if needed
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml')
      },
      themePath: 'path-to-theme.css' // Optional, useful for dynamic theme changes
    })
  ]
};
```

### HighlightOptions API

| Name               | Description                                                                                                                    |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------|
| fullLibraryLoader  | A function returning a promise to load the entire `highlight.js` script                                                        |
| coreLibraryLoader  | A function returning a promise to load the core `highlight.js` script                                                          |
| lineNumbersLoader  | A function returning a promise to load the `lineNumbers` script for adding line numbers                                        |
| languages          | The languages to register with Highlight.js (Needed only if you opt to use `coreLibraryLoader`)                                |
| config             | Set Highlight.js configuration, see [configure-options](http://highlightjs.readthedocs.io/en/latest/api.html#configure-option) |
| lineNumbersOptions | Set line numbers plugin options                                                                                                |
| themePath          | The path to the CSS file for the highlighting theme                                                                            |

<a name="themes"/>

### Import highlighting theme

**Dynamic Approach**

Set the theme path in the global configuration to enable dynamic theme changes:

```ts
 providers: [
  {
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      // ...
      themePath: 'assets/styles/solarized-dark.css'
    }
  }
]
```

Alternatively, import the theme from the app's distribution folder or use a CDN link.

When switching between app themes, call the `setTheme(path)` method from the `HighlightLoader` service.

```ts
import { HighlightLoader } from 'ngx-highlightjs';

export class AppComponent {

  private hljsLoader: HighlightLoader = inject(HighlightLoader);

  onAppThemeChange(appTheme: 'dark' | 'light') {
    this.hljsLoader.setTheme(appTheme === 'dark' ? 'assets/styles/solarized-dark.css' : 'assets/styles/solarized-light.css');
  }
}
```

**Traditional Approach**

In `angular.json`:

```
"styles": [
  "styles.css",
  "../node_modules/highlight.js/styles/github.css",
]
```

Or directly in `src/style.scss`:

```css
@import 'highlight.js/styles/github.css';
```

_[List of all available themes from highlight.js](https://github.com/isagalaev/highlight.js/tree/master/src/styles)_

<a name="highlight"/>

### Highlight Directive Usage

To apply code highlighting, use the `highlight` directive. It requires setting the target language, with an optional feature to ignore illegal syntax.

```ts
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'app-root',
  template: `
    <pre><code [highlight]="code" language="html"></code></pre>
  `,
  imports: [Highlight]
})
export class AppComponent {
}
```

#### Options

| Name                 | Type            | Description                                                                                                                                                    |
|----------------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **[highlight]**      | string          | Code to highlight.                                                                                                                                             |
| **[language]**       | string          | Parameter must be present and specify the language name or alias of the grammar to be used for highlighting.                                                   |
| **[ignoreIllegals]** | boolean         | An optional parameter that when true forces highlighting to finish even in case of detecting illegal syntax for the language instead of throwing an exception. |
| **(highlighted)**    | HighlightResult | Stream that emits the result object when element is highlighted                                                                                                |


<a name="highlight-auto"/>

### HighlightAuto Directive Usage

The `highlightAuto` directive works the same way but automatically detects the language to apply highlighting.

```ts
import { HighlightAuto } from 'ngx-highlightjs';

@Component({
  selector: 'app-root',
  template: `
    <pre><code [highlightAuto]="code"></code></pre>
  `,
  imports: [HighlightAuto]
})
export class AppComponent {
}
```

#### Options

| Name                | Type                | Description                                                                                                |
|---------------------|---------------------|------------------------------------------------------------------------------------------------------------|
| **[highlightAuto]** | string              | Accept code string to highlight, default `null`                                                            |
| **[languages]**     | string[]            | An array of language names and aliases restricting auto detection to only these languages, default: `null` |
| **(highlighted)**   | AutoHighlightResult | Stream that emits the result object when element is highlighted                                            |


<a name="line-numbers"/>

## Line Numbers Directive Usage

The `lineNumbers` directive extends highlighted code with line numbers. It functions in conjunction with the `highlight` and `highlightAuto` directives.

```ts
import { HighlightAuto } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-root',
  template: `
    <pre><code [highlightAuto]="code" lineNumbers></code></pre>
  `,
  imports: [HighlightAuto, HighlightLineNumbers]
})
export class AppComponent {
}
```

#### Options

| Name             | Type    | Description                                                  |
|------------------|---------|--------------------------------------------------------------|
| **[singleLine]** | boolean | Enable plugin for code block with one line, default `false`. |
| **[startFrom]**  | number  | Start numbering from a custom value, default `1`.            |

### NOTE

During the project build process, you may encounter a warning stating `WARNING in ... CommonJS or AMD dependencies can cause optimization bailouts`.

To address this warning, include the following configuration in your angular.json file:

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


<a name="plus"/>

## Plus package

This package provides the following features:

- Utilizes the gists API to highlight code snippets directly from GitHub gists.
- Supports direct code highlighting from URLs.

### Usage

To integrate this addon into your project, ensure the presence of `HttpClient` by importing it into your `main.ts` file.

```ts
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient()
  ]
};
```

### Highlight a gist file

1. Use `[gist]` directive, passing the gist ID as its attribute, to retrieve the response through the `(gistLoaded)` output event.
2. Upon the emission of `(gistLoaded)`, gain access to the gist response.
3. Use `gistContent` pipe to extract the file's content from the gist response based on the specified file name.

**Example:**

```ts
import { HighlightPlusModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-root',
  template: `
    <pre [gist]="gistId" (gistLoaded)="gist = $event">
      <code [highlight]="gist | gistContent: 'main.js'"></code>
    </pre>
  `,
  imports: [HighlightPlusModule]
})
export class AppComponent {
}
```

### Highlight all gist files

To loop over `gist?.files`, use `keyvalue` pipe to pass file name into `gistContent` pipe.

To highlight all files within a gist, iterate through `gist.files` and utilize the `keyvalue` pipe to pass the file name into the `gistContent` pipe.

**Example:**

```ts
import { HighlightPlusModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-root',
  template: `
    <ng-container [gist]="gistId" (gistLoaded)="gist = $event">
      @for (file of gist?.files | keyvalue; track file.key) {
        <pre><code [highlight]="gist | gistContent: file.key"></code></pre>
      }
    </ng-container>
  `,
  imports: [HighlightPlusModule, CommonModule]
})
export class AppComponent {
}
```

### Highlight code from URL directly

Use the pipe `codeFromUrl` with the `async` pipe to get the code text from a raw URL.

**Example:**

```ts
import { HighlightPlusModule } from 'ngx-highlightjs';

@Component({
  selector: 'app-root',
  template: `
   <pre>
     <code [highlight]="codeUrl | codeFromUrl | async"></code>
   </pre>
  `,
  imports: [HighlightPlusModule, CommonModule]
})
export class AppComponent {
}
```

### Providing Gist API secret (Optional)

The package offers the `provideHighlightOptions` function, allowing you to set your `clientId` and `clientSecret` for the gist HTTP requests.
You can provide these options in your `app.config.ts` file as demonstrated below:

```ts
import { provideHttpClient } from '@angular/common/http';
import { provideHighlightOptions } from 'ngx-highlightjs/plus'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideGistOptions({
      clientId: 'CLIENT_ID',
      clientSecret: 'CLIENT_SECRET'
    })
  ]
};
```


<a name="issues"/>

## Issues

If you identify any errors in the library, or have an idea for an improvement, please open
an [issue](https://github.com/MurhafSousli/ngx-highlightjs/issues).

<a name="author"/>

## Author

**Murhaf Sousli**

- [github/murhafsousli](https://github.com/MurhafSousli)
- [twitter/murhafsousli](https://twitter.com/MurhafSousli)

<a name="more-plugins"/>

## More plugins

- [ngx-scrollbar](https://github.com/MurhafSousli/ngx-scrollbar)
- [ngx-sharebuttons](https://github.com/MurhafSousli/ngx-sharebuttons)
- [ngx-gallery](https://github.com/MurhafSousli/ngx-gallery)
- [ngx-progressbar](https://github.com/MurhafSousli/ngx-progressbar)
- [ngx-bar-rating](https://github.com/MurhafSousli/ngx-bar-rating)
- [ngx-disqus](https://github.com/MurhafSousli/ngx-disqus)
