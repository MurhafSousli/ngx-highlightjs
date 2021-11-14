import { TestBed, waitForAsync } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';
import * as hljs from 'highlight.js';
import { HighlightLoader } from './highlight.loader';
import { HighlightLibrary } from './highlight.model';


// Fake Highlight Loader
const highlightLoaderStub = {
  ready: new BehaviorSubject(hljs)
};

describe('HighlightService', () => {

  let loader: HighlightLoader;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HighlightLoader, useValue: highlightLoaderStub }]
    }).compileComponents();
    loader = TestBed.inject(HighlightLoader);
  }));

  it('should load the library', (done: DoneFn) => {
    loader.ready.subscribe((lib: HighlightLibrary) => {
      expect(lib).toBeTruthy();
      done();
    });
  });
});
