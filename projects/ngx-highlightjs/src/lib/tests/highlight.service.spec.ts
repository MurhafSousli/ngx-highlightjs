import { TestBed } from '@angular/core/testing';
import { HIGHLIGHT_OPTIONS, HighlightJS, HighlightLoader, HighlightJSOptions } from 'ngx-highlightjs';
import hljs from 'highlight.js';
import { highlightLoaderStub } from './common-tests';

import md from 'highlight.js/lib/languages/markdown';


describe('HighlightService', () => {

  const testJsCode: string = 'console.log(&quot;test&quot;)';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: HighlightLoader, useValue: highlightLoaderStub }
      ]
    }).compileComponents();
  });

  it('should be created', () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    expect(service).toBeTruthy();
  });

  it('should override the default config of highlight.js', async () => {
    TestBed.overrideProvider(HIGHLIGHT_OPTIONS, {
      useValue: {
        highlightOptions: {
          languages: ['ts', 'html']
        }
      } as HighlightJSOptions
    });
    const configureSpy: jasmine.Spy = spyOn(hljs,'configure');
    const loader: HighlightLoader = TestBed.inject(HighlightLoader);
    TestBed.inject(HighlightJS);
    await loader.ready;
    expect(configureSpy).toHaveBeenCalledWith({
      languages: ['ts', 'html']
    });
  });

  it('should call hljs [highlight] function', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    const highlightSpy: jasmine.Spy = spyOn(hljs, 'highlight');

    await service.highlight(testJsCode, {
      language: 'ts',
      ignoreIllegals: false
    });

    expect(highlightSpy).toHaveBeenCalledWith(testJsCode, {
      language: 'ts',
      ignoreIllegals: false
    });
  });


  it('should set the library reference signal when library is loaded', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    await service['loader'].ready;
    expect(service.hljs()).toEqual(hljs);
  });

  it('should call hljs [highlightAuto] function', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    const highlightAutoSpy: jasmine.Spy = spyOn(hljs, 'highlightAuto');

    await service.highlightAuto(testJsCode, ['ts', 'html']);

    expect(highlightAutoSpy).toHaveBeenCalledWith(testJsCode, ['ts', 'html']);
  });

  it('should call hljs [highlightElement] function', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    const element: HTMLElement = document.createElement('div');
    element.innerHTML = testJsCode;

    const highlightElementSpy: jasmine.Spy = spyOn(hljs, 'highlightElement');

    await service.highlightElement(element);

    expect(highlightElementSpy).toHaveBeenCalledWith(element);
  });


  it('should call hljs [highlightAll] function', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    const highlightAllSpy: jasmine.Spy = spyOn(hljs, 'highlightAll');

    await service.highlightAll();

    expect(highlightAllSpy).toHaveBeenCalled();
  });

  it('should call hljs [highlightAll] function', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    const configureSpy: jasmine.Spy = spyOn(hljs, 'configure');

    await service.configure({ languages: ['ts', 'html'] });

    expect(configureSpy).toHaveBeenCalledWith({ languages: ['ts', 'html'] });
  });

  it('should call hljs [registerLanguage] function', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    const registerLanguageSpy: jasmine.Spy = spyOn(hljs, 'registerLanguage');

    await service.registerLanguage('markdown', md);

    expect(registerLanguageSpy).toHaveBeenCalledWith('markdown', md);
  });


  it('should call hljs [debugMode] function', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    const debugModeSpy: jasmine.Spy = spyOn(hljs, 'debugMode');

    await service.debugMode();

    expect(debugModeSpy).toHaveBeenCalled();
  });

  it('should call hljs [safeMode] function', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    const safeModeSpy: jasmine.Spy = spyOn(hljs, 'safeMode');

    await service.safeMode();

    expect(safeModeSpy).toHaveBeenCalled();
  });

  it('should call hljs [getLanguage] function', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    const getLanguageSpy: jasmine.Spy = spyOn(hljs, 'getLanguage');

    await service.getLanguage('html');

    expect(getLanguageSpy).toHaveBeenCalledWith('html');
  });

  it('should call hljs [listLanguages] function', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    const listLanguagesSpy: jasmine.Spy = spyOn(hljs, 'listLanguages');

    await service.listLanguages();

    expect(listLanguagesSpy).toHaveBeenCalled();
  });

  it('should call hljs [unregisterLanguage] function', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    const unregisterLanguageSpy: jasmine.Spy = spyOn(hljs, 'unregisterLanguage');

    await service.unregisterLanguage('markdown');

    expect(unregisterLanguageSpy).toHaveBeenCalledWith('markdown');
  });

  it('should call hljs [registerAliases] function', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    const registerAliasesSpy: jasmine.Spy = spyOn(hljs, 'registerAliases');

    await service.registerAliases('md', { languageName: 'markdown' });

    expect(registerAliasesSpy).toHaveBeenCalledWith('md', { languageName: 'markdown' });
  });


  it('should call hljs [lineNumbersBlock] function', async () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    const element: HTMLElement = document.createElement('div');
    element.innerHTML = testJsCode;
    const registerAliasesSpy: jasmine.Spy = spyOn(hljs as any, 'lineNumbersBlock');

    await service.lineNumbersBlock(element, { singleLine: true });

    expect(registerAliasesSpy).toHaveBeenCalledWith(element, { singleLine: true });
  });
});
