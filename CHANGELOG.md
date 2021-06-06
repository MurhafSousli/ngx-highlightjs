# Changelog

## 4.1.4

- Upgrade to Angular 12
- Set peer dependency of hljs to v10

## 4.1.3

- Upgrade to Angular 11
- Build the library in strict mode

### Breaking changes:

- refactor: Highlight directive => function `highlightElement(code: string, languages: string[])`: the languages param is not optional anymore.

## 4.1.2

- fix: codeFromUrl display error message in the console even though it works, closes [#141](https://github.com/MurhafSousli/ngx-highlightjs/issues/141) in [d60dc10](https://github.com/MurhafSousli/ngx-highlightjs/pull/142/commits/d60dc10b5c5ce9d269214b2a7f6f6e9f3d02eaed).

## 4.1.1

- Upgrade project to Angular 10.
- fix: Remove the default behavior of adding highlight.js to the bundle directory, closes [#122](https://github.com/MurhafSousli/ngx-highlightjs/issues/122) in [339ff18](https://github.com/MurhafSousli/ngx-highlightjs/pull/135/commits/339ff18f85852000e17d0e20c416d3836d29ab7d).
- fix: Setting the highlighted code to empty string will not reflect the value change, closes [#199](https://github.com/MurhafSousli/ngx-highlightjs/issues/119) in [9ee1942](https://github.com/MurhafSousli/ngx-highlightjs/pull/136/commits/9ee1942e0d1cb61e8854e1a6e263509d099e52f0).

## 4.1.0-beta

- Upgrade to Angular 9 in [#113](https://github.com/MurhafSousli/ngx-highlightjs/pull/113).
- fix: Remove warning when the package is installed in Angular 9 in [6d491be](https://github.com/MurhafSousli/ngx-highlightjs/pull/117/commits/6d491befcd7495d6be37fca7cb5325c7c11a017b).

## 4.0.2

- fix: use `element.textContent` to set the code before highlighting, closes [#105](https://github.com/MurhafSousli/ngx-highlightjs/issues/105) in [34afad7](https://github.com/MurhafSousli/ngx-highlightjs/commit/34afad7db4d0945e2f0022fcdf17b3fb87f01c69).

## 4.0.1

- fix: Change `r` property name to `relevance` in `HighlightResult` interface, closes [#84](https://github.com/MurhafSousli/ngx-highlightjs/issues/84) in [ce53661](https://github.com/MurhafSousli/ngx-highlightjs/commit/ce536614179a97dbd26a35bd40dd5226f8d6a408).
- fix: Sanitize highlighted code before appending it to the DOM, closes [#101](https://github.com/MurhafSousli/ngx-highlightjs/issues/101) in [9afe6b6](https://github.com/MurhafSousli/ngx-highlightjs/pull/103/commits/9afe6b661255c4e8d6569dec3370843eb34d16de).
- fix: Check if `nativeElement.firstChildElement` is not null before calling line numbers lib, in [494c976](https://github.com/MurhafSousli/ngx-highlightjs/pull/104/commits/494c97616fc6e1b9e965e3910a51214d86837a39).

## 4.0.0

- feat: Lazy-load **hljs** library, closes [#89](https://github.com/MurhafSousli/ngx-highlightjs/issues/89) in [8cdba13](https://github.com/MurhafSousli/ngx-highlightjs/pull/88/commits/8cdba13d72e563a2189b816d41f959e3dc18be21).
- feat: Lazy-load languages scripts, in [952f33c](https://github.com/MurhafSousli/ngx-highlightjs/pull/88/commits/952f33cd2c297f1d249d3c04c89e3d206cea9207).
- feat: Gist directive, closes [#90](https://github.com/MurhafSousli/ngx-highlightjs/issues/90) in [8b4c8fc](https://github.com/MurhafSousli/ngx-highlightjs/pull/88/commits/8b4c8fc5090e58f1ec5161613d3b1b3ab2ad57af).
- feat: Highlight code directly from URL, closes [#91](https://github.com/MurhafSousli/ngx-highlightjs/issues/91) in [5fa3c59](https://github.com/MurhafSousli/ngx-highlightjs/pull/88/commits/5fa3c59bfeb5b399e0951edba7eb15838dda0f0a).
- feat: Line numbers, closes [#35](https://github.com/MurhafSousli/ngx-highlightjs/issues/35) in [c19b878](https://github.com/MurhafSousli/ngx-highlightjs/pull/88/commits/c19b8780816854b994b5073892f86d51a4d0aa58).
- enhance: Move `highlight.js` package from **peerDependencies** to **dependencies**
- fix: Check if [highlight] input got undefined value, closes [#81](https://github.com/MurhafSousli/ngx-highlightjs/issues/81) in [f2b14bd](https://github.com/MurhafSousli/ngx-highlightjs/pull/88/commits/f2b14bd97d02510eed1f522182db4ba06001dc47).
- fix: Add test files, closes [#79](https://github.com/MurhafSousli/ngx-highlightjs/issues/79) in [2913d05](https://github.com/MurhafSousli/ngx-highlightjs/pull/88/commits/2913d05fe3f0b0ba5b1fcdb6fede66af2a966201).

### Breaking Changes

- Since the core library `highlight.js` will be lazy-loaded, all **hljs** functions in `HighlightJS` will return observables to make sure the library is loaded before execution.
- `HighlightChildren` directive has been deprecated.
- The global options languages property `NgScrollOptions.languages` type has changed.
- `HighlightModule.forRoot()` is deprecated, the highlight global options can be set using the injection token `HIGHLIGHT_OPTIONS`

## 3.0.3

- fix(HighlightChildren): fix `OnDestroy()` error (Cannot read property 'disconnect' of undefined), closes [#75](https://github.com/MurhafSousli/ngx-highlightjs/issues/75) in [3379905](https://github.com/MurhafSousli/ngx-highlightjs/commit/337990549984a5cc3007a7007273d562580e48f7).

## 3.0.2

- fix(HighlightChildren): Highlight children not working inside `[innerHtml]`, closes [#67](https://github.com/MurhafSousli/ngx-highlightjs/issues/67) in [969f3b3](https://github.com/MurhafSousli/ngx-highlightjs/pull/73/commits/969f3b343f4a1015aa89dfca4625d64e4b1a28fd).

## 3.0.0

### Breaking Changes

Version 3 is written from scratch, Please read the updated [documentations](/README.MD).

## 2.1.4

- fix(HighlightJS): load hljs theme only if hljs script is loaded automatically, closes [#56](https://github.com/MurhafSousli/ngx-highlightjs/issues/56) in [66d0688](https://github.com/MurhafSousli/ngx-highlightjs/pull/57/commits/66d0688aed0fed878b23ca61be1a6bcd3b06fc62).

## 2.1.3

- fix(HighlightJS): Fix initializing hljs configure and the function parameter interface `hljs.configure(config: HighlightConfig)`.
- refactor(HighlightJS): Inject `DOCUMENT` to access the document class, in [4ff6ceb](https://github.com/MurhafSousli/ngx-highlightjs/pull/52/commits/4ff6ceb4aadee1c7dbfda73dcb39a04a8dacd551).
- enhance(HighlightJS): Access hljs from `document.defaultView`.
- Add rxjs as peerDependency.

## 2.1.2

- fix peerDependencies for Angular >= 6
- refactor(HighlightJS): Provide `HighlightJS` using `providedIn: 'root'`

## 2.1.1

- refactor(HighlightJS): Add types on parameters in hljs functions, fixed in [#40](https://github.com/MurhafSousli/ngx-highlightjs/pull/40)

## 2.1.0

- feat(HighlightJS): Expose HighlightJS service with original functions, closes [#37](https://github.com/MurhafSousli/ngx-highlightjs/issues/37) in [90a8e17](https://github.com/MurhafSousli/ngx-highlightjs/commit/90a8e17e23da840395933c5657e09d693c086ebe).

## 2.0.2

- fix(Build): fix AOT build error, closes [#31](https://github.com/MurhafSousli/ngx-highlightjs/issues/31) in [161b36](https://github.com/MurhafSousli/ngx-highlightjs/commit/161b36fce9c23d9b190b21de00cd0fad09ee9b3d)

## 2.0.1

- Upgrade to Angular 6, closes [#28](https://github.com/MurhafSousli/ngx-highlightjs/issues/28) in [#30](https://github.com/MurhafSousli/ngx-highlightjs/pull/30)

## 1.4.1

- Fix(HighlightDirective): `highlight="all"`, Apply `.hljs` class on code elements only, closes [#23](https://github.com/MurhafSousli/ngx-highlightjs/issues/23)

## 1.4.0

- Feature(language input): an array of language names and aliases restricting auto detection to only these languages, closes [#20](https://github.com/MurhafSousli/ngx-highlightjs/issues/20).
- Feature(hljs [global config](http://highlightjs.readthedocs.io/en/latest/api.html#configure-options)): set global config in `HighlightModule.forRoot({ config: hljsConfig })`).
- Support the manual load of hljs script and styles.

## 1.3.0

- Feature: Add `(highlighted)` output, a stream that emits higlight result, closes [#16](https://github.com/MurhafSousli/ngx-highlightjs/issues/16).

## 1.2.6

- Refactor with RxJS pipe 5.5 style

## 1.2.3

- Fix(HighlightService) Move `InjectionToken` to a seperate file, closes [#11](https://github.com/MurhafSousli/ngx-highlightjs/issues/11)

## 1.2.2

- No Changes, just an update for the build enviroment

## 1.2.1

- fix(HighlightDirective): Use `el.tagName.toLowerCase()` to check for if the highlight element is type of `<code>`

## 1.2.0

- Remove *HighlightUmdModule* and systemjs support
- Refactir(HighlightModule)
- Add `[code]` input

## 1.1.1

- Improve performance
- Fix load hljs script only once
- Remove `hlAuto` and `hlDelay` inputs from *HighlightDirective*, but they are still usable in *HighlightUmdDirective*
- Update `HighlightModule` parameter:

    before:
    ```ts
      HighlightModule.forRoot('monokai-sublime', 'assets/js/highlight-js');
    ```

    after

    ```ts
      HighlightModule.forRoot({
        theme: 'monokai-sublime',
        path: 'assets/js/highlight-js',
        auto: true
      });
    ```

## 1.0.0

- feat(HighlightModule): Choose highlight theme and set library path
- feat(Auto-load script)
- feat(Auto-load theme)

## 0.0.1

- Initial release
