import { TestBed } from '@angular/core/testing';
import { HIGHLIGHT_OPTIONS, HighlightJSOptions, provideHighlightOptions } from 'ngx-highlightjs';

const fullLibraryLoader = () => import('highlight.js');

describe('provideHighlightOptions', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHighlightOptions({ fullLibraryLoader })
      ]
    }).compileComponents();
  });

  it('should be able to provide options using provideHighlightOptions function', () => {
    const options: HighlightJSOptions = TestBed.inject(HIGHLIGHT_OPTIONS);
    expect(options).toBeTruthy();
  });
});
