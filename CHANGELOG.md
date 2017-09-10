## Angular highlight.js Changelog

### 1.2.0

 - Remove *HighlightUmdModule* and systemjs support
 - Refactir(HighlightModule)
 - Add `[code]` input

### 1.1.1

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

### 1.0.0

 - feat(HighlightModule): Choose highlight theme and set library path
 - feat(Auto-load script)
 - feat(Auto-load theme)

### 0.0.1

 - Initial release