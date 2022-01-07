import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import hljs from 'highlight.js';
import { Highlight } from './highlight';
import { HighlightLoader } from './highlight.loader';
import { HighlightLibrary } from './highlight.model';

@Component({
  template: `<code [highlight]="code"></code>`
})
class TestHighlightComponent implements OnInit {
  @Input() code: string;

  ngOnInit(): void {
  }
}

// Fake Highlight Loader
const highlightLoaderStub = {
  ready: new BehaviorSubject(hljs)
};

describe('Highlight Directive', () => {
  let component: TestHighlightComponent;
  let directiveElement: DebugElement;
  let directiveInstance: Highlight;
  let fixture: ComponentFixture<TestHighlightComponent>;
  let loader: HighlightLoader;
  const testJsCode = 'console.log(&quot;test&quot;)';
  const testHtmlCode = '<div class=&quot;my-class&quot;></div>';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Highlight, TestHighlightComponent],
      providers: [{ provide: HighlightLoader, useValue: highlightLoaderStub }]
    }).compileComponents();
    loader = TestBed.inject(HighlightLoader);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHighlightComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(Highlight));
    directiveInstance = directiveElement.injector.get(Highlight);
    fixture.detectChanges();
  });

  it('should create highlight directive', () => {
    expect(directiveInstance).not.toBeNull();
  });

  it('should add hljs class', () => {
    expect(directiveElement.nativeElement.classList.contains('hljs')).toBeTruthy();
  });

  it('should highlight given text', fakeAsync(() => {
    let highlightedCode: string;
    component.code = testJsCode;
    fixture.detectChanges();
    loader.ready.subscribe((lib: HighlightLibrary) => highlightedCode = lib.highlightAuto(testJsCode, null).value);
    tick(500);
    expect(directiveElement.nativeElement.innerHTML).toBe(highlightedCode);
  }));

  it('should reset text if empty string was passed', () => {
    component.code = '';
    fixture.detectChanges();
    expect(directiveElement.nativeElement.innerHTML).toBe('');
  });

  it('should not highlight if code is undefined', () => {
    spyOn(directiveInstance, 'highlightElement');
    component.code = null;
    fixture.detectChanges();
    expect(directiveInstance.highlightElement).not.toHaveBeenCalled();
  });

  it('should highlight given text and highlight another text when change', fakeAsync(() => {
    let highlightedCode: string;
    component.code = testJsCode;
    fixture.detectChanges();
    loader.ready.subscribe((lib: HighlightLibrary) => highlightedCode = lib.highlightAuto(testJsCode, null).value);
    tick(500);
    expect(directiveElement.nativeElement.innerHTML).toBe(highlightedCode);

    // Change code 2nd time with another value
    component.code = testHtmlCode;
    fixture.detectChanges();
    loader.ready.subscribe((lib: HighlightLibrary) => highlightedCode = lib.highlightAuto(testHtmlCode, null).value);
    tick(500);
    expect(directiveElement.nativeElement.innerHTML).toBe(highlightedCode);

    // Change code 3rd time but with empty string
    component.code = '';
    fixture.detectChanges();
    tick(300);
    expect(directiveElement.nativeElement.innerHTML).toBe('');

    // Change code 4th time but with nullish value
    component.code = null;
    fixture.detectChanges();
    tick(300);
    expect(directiveElement.nativeElement.innerHTML).toBe('');
  }));
});
