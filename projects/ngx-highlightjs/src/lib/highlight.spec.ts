import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import * as hljs from 'highlight.js';
import { Highlight } from './highlight';
import { HighlightLoader } from './highlight.loader';

@Component({
  template: `<code [highlight]="code"></code>`
})
class TestHighlightComponent {
  @Input() code: string;
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
  const testCode = 'console.log("test")';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Highlight, TestHighlightComponent],
      providers: [{ provide: HighlightLoader, useValue: highlightLoaderStub }]
    }).compileComponents();
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
    const highlightedCode = hljs.highlightAuto(testCode).value;
    expect(directiveElement.nativeElement.innerHTML).toBe(highlightedCode);
  }));
});
