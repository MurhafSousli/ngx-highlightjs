import { TestBed } from '@angular/core/testing';

import { HighlightJS } from './highlight.service';

describe('HiglightManager', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HighlightJS = TestBed.get(HighlightJS);
    expect(service).toBeTruthy();
  });
});
