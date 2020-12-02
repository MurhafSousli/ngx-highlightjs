import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement, Input, OnInit } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import * as hljs from 'highlight.js';
import { Highlight } from './highlight';
import { HighlightLoader } from './highlight.loader';

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
  const testCode = 'console.log(&quot;test&quot;)';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Highlight, TestHighlightComponent],
      providers: [{ provide: HighlightLoader, useValue: highlightLoaderStub }]
    }).compileComponents();
    loader = TestBed.get(HighlightLoader);
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
    component.code = testCode;
    fixture.detectChanges();
    let highlightedCode;
    loader.ready.subscribe((lib) => highlightedCode = lib.highlightAuto(testCode, null).value);
    tick(500);
    expect(directiveElement.nativeElement.innerHTML).toBe(highlightedCode);
  }));
});
