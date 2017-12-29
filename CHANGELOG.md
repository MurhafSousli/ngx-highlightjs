# Angular highlight.js Changelog

## 1.4.0

- Feature(language input): an array of language names and aliases restricting auto detection to only these languages.
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