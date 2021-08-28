import { TestBed, waitForAsync } from '@angular/core/testing';

import { HighlightJS } from './highlight.service';
import { BehaviorSubject } from 'rxjs';
import * as  hljs from 'highlight.js';
import { HighlightLoader } from './highlight.loader';


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

  it('should be created', () => {
    const service: HighlightJS = TestBed.inject(HighlightJS);
    expect(service).toBeTruthy();
  });
});
