import { TestBed } from '@angular/core/testing';
import { HIGHLIGHT_OPTIONS, HighlightLoader, HighlightJSOptions } from 'ngx-highlightjs';
import hljs, { HLJSApi } from 'highlight.js';
import { LoaderErrors } from '../loader-errors';


const fullLibraryLoader = () => import('highlight.js');
const lineNumbersLoader = () => import('ngx-highlightjs/line-numbers');
const coreLibraryLoader = () => import('highlight.js/lib/core');
const typescript = () => import('highlight.js/lib/languages/typescript');

describe('HighlightService', () => {

  beforeEach(() => {
    // Clean up hljs
    document.defaultView['hljs'] = null;
  });

  it('should work when library is loaded externally', async () => {
    document.defaultView['hljs'] = hljs;
    const loader: HighlightLoader = TestBed.inject(HighlightLoader);
    const lib: HLJSApi = await loader.ready;
    expect(lib).toBe(hljs);
  });

  it('should load the library when fullLibrary is provided', async () => {
    TestBed.overrideProvider(HIGHLIGHT_OPTIONS, {
      useValue: {
        fullLibraryLoader
      } as HighlightJSOptions
    });

    const loader: HighlightLoader = TestBed.inject(HighlightLoader);
    const lib: HLJSApi = await loader.ready;
    expect(lib).toBe(hljs);
  });

  it('should load the library when coreLibrary is provided', async () => {
    TestBed.overrideProvider(HIGHLIGHT_OPTIONS, {
      useValue: {
        coreLibraryLoader,
        languages: {
          typescript
        }
      } as HighlightJSOptions
    });

    const loader: HighlightLoader = TestBed.inject(HighlightLoader);
    const lib: HLJSApi = await loader.ready;
    expect(lib).toBe(hljs);
  });

  it('should load the library when lineNumber is provided', async () => {
    TestBed.overrideProvider(HIGHLIGHT_OPTIONS, {
      useValue: {
        fullLibraryLoader,
        lineNumbersLoader
      } as HighlightJSOptions
    });

    const loader: HighlightLoader = TestBed.inject(HighlightLoader);
    const lib: HLJSApi = await loader.ready;
    expect(lib).toBe(hljs);
    expect(lib['lineNumbersBlock']).toBeTruthy();
  });

  it('should throw an error if library options did not exist', async () => {
    try {
      const loader: HighlightLoader = TestBed.inject(HighlightLoader);
      await loader.ready;
    } catch (error) {
      expect(error).toBe(LoaderErrors.NO_FULL_AND_NO_CORE_IMPORTS);
    }
  });

  it('should throw an error if both fullLibrary and coreLibrary loaders were provided', async () => {
    try {
      TestBed.overrideProvider(HIGHLIGHT_OPTIONS, {
        useValue: {
          fullLibraryLoader,
          coreLibraryLoader
        } as HighlightJSOptions
      });
      const loader: HighlightLoader = TestBed.inject(HighlightLoader);
      await loader.ready;
    } catch (error) {
      expect(error).toBe(LoaderErrors.FULL_WITH_CORE_LIBRARY_IMPORTS);
    }
  });

  it('should throw an error if both fullLibrary and languages loaders were provided', async () => {
    try {
      TestBed.overrideProvider(HIGHLIGHT_OPTIONS, {
        useValue: {
          fullLibraryLoader,
          languages: {
            typescript
          }
        } as HighlightJSOptions
      });
      const loader: HighlightLoader = TestBed.inject(HighlightLoader);
      await loader.ready;
    } catch (error) {
      expect(error).toBe(LoaderErrors.FULL_WITH_LANGUAGE_IMPORTS);
    }
  });

  it('should throw an error if coreLibrary was provided without any language', async () => {
    try {
      TestBed.overrideProvider(HIGHLIGHT_OPTIONS, {
        useValue: {
          coreLibraryLoader
        } as HighlightJSOptions
      });
      const loader: HighlightLoader = TestBed.inject(HighlightLoader);
      await loader.ready;
    } catch (error) {
      expect(error).toBe(LoaderErrors.CORE_WITHOUT_LANGUAGE_IMPORTS);
    }
  });

  it('should throw an error if languages were provided without the coreLibrary', async () => {
    try {
      TestBed.overrideProvider(HIGHLIGHT_OPTIONS, {
        useValue: {
          languages: {
            typescript
          }
        } as HighlightJSOptions
      });
      const loader: HighlightLoader = TestBed.inject(HighlightLoader);
      await loader.ready;
    } catch (error) {
      expect(error).toBe(LoaderErrors.LANGUAGE_WITHOUT_CORE_IMPORTS);
    }
  });


  it('should create style element when loading a theme', () => {
    document.defaultView['hljs'] = hljs;
    const loader: HighlightLoader = TestBed.inject(HighlightLoader);

    const path: string = 'https://path-to-theme.css/';

    const linkElement: HTMLLinkElement = document.createElement('link');
    const createElementSpy: jasmine.Spy = spyOn(document, 'createElement').and.returnValue(linkElement);
    const appendChildSpy: jasmine.Spy = spyOn(document.head, 'appendChild');

    (loader as any).loadTheme(path);

    expect(createElementSpy).toHaveBeenCalledWith('link');
    expect(loader['_themeLinkElement']).toBeTruthy();
    expect(loader['_themeLinkElement'].href).toBe(path);
    expect(loader['_themeLinkElement'].type).toBe('text/css');
    expect(loader['_themeLinkElement'].rel).toBe('stylesheet');
    expect(loader['_themeLinkElement'].media).toBe('screen,print');
    expect(appendChildSpy).toHaveBeenCalledWith(loader['_themeLinkElement']);
  });

  it('should update existing style element when setting a theme', () => {
    document.defaultView['hljs'] = hljs;
    const loader: HighlightLoader = TestBed.inject(HighlightLoader);

    loader.setTheme('https://initial-theme-path.css/');

    const diffPath: string = 'https://different-theme-path.css/';

    loader.setTheme(diffPath);
    expect(loader['_themeLinkElement'].href).toBe(diffPath);
  });

  it('should load a new style element when setting a theme if no existing element', () => {
    document.defaultView['hljs'] = hljs;
    const loader: HighlightLoader = TestBed.inject(HighlightLoader);

    const path: string = 'https://path-to-theme.css/';
    spyOn(loader as any, 'loadTheme');

    loader.setTheme(path);

    expect((loader as any).loadTheme).toHaveBeenCalledWith(path);
  });


  it('should load theme on init if themePath option is provided', () => {
    const themePath: string = 'https://path-to-theme.css/';
    TestBed.overrideProvider(HIGHLIGHT_OPTIONS, {
      useValue: {
        themePath: 'https://path-to-theme.css/'
      } as HighlightJSOptions
    });

    document.defaultView['hljs'] = hljs;
    const loader: HighlightLoader = TestBed.inject(HighlightLoader);

    expect(loader['_themeLinkElement']).toBeTruthy();
    expect(loader['_themeLinkElement'].href).toBe(themePath);
    expect(loader['_themeLinkElement'].type).toBe('text/css');
    expect(loader['_themeLinkElement'].rel).toBe('stylesheet');
    expect(loader['_themeLinkElement'].media).toBe('screen,print');
  });
});
