# Changelog

## 4.0.0-beta.0

- feat: Lazy-load **hljs** library and the selected languages, closes [#89](https://github.com/MurhafSousli/ngx-highlightjs/issues/89) in [8cdba13](https://github.com/MurhafSousli/ngx-highlightjs/pull/88/commits/8cdba13d72e563a2189b816d41f959e3dc18be21).
- fix: Check if [highlight] input got undefined value, closes [#81](https://github.com/MurhafSousli/ngx-highlightjs/issues/81) in [f2b14bd](https://github.com/MurhafSousli/ngx-highlightjs/pull/88/commits/f2b14bd97d02510eed1f522182db4ba06001dc47).
- fix: Add test files, closes [#79](https://github.com/MurhafSousli/ngx-highlightjs/issues/79) in [2913d05](https://github.com/MurhafSousli/ngx-highlightjs/pull/88/commits/2913d05fe3f0b0ba5b1fcdb6fede66af2a966201).

### Breaking Changes

- Since **hljs** library is lazy-loaded, all **hljs** functions in `HighlightJS` service are now returning observables.

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
