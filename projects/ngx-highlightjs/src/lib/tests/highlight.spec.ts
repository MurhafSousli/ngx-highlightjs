import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { Component, Input, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Highlight, HighlightLoader } from 'ngx-highlightjs';
import hljs from 'highlight.js';
import { afterTimeout, highlightLoaderStub } from './common-tests';

@Component({
  template: `<code [highlight]="code" [language]="language"></code>`,
  standalone: true,
  imports: [Highlight]
})
class TestHighlightComponent {
  @Input() code: string;
  @Input() language: string;
}

describe('Highlight Directive', () => {
  let component: TestHighlightComponent;
  let directiveElement: DebugElement;
  let directiveInstance: Highlight;
  let fixture: ComponentFixture<TestHighlightComponent>;

  const testJsCode: string = 'console.log(&quot;test&quot;)';
  const testHtmlCode: string = '<div class=&quot;my-class&quot;></div>';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Highlight, TestHighlightComponent],
      providers: [
        { provide: HighlightLoader, useValue: highlightLoaderStub },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHighlightComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(Highlight));
    directiveInstance = directiveElement.injector.get(Highlight);
  });

  it('should create highlight directive add hljs class', () => {
    expect(directiveInstance).toBeTruthy();
    expect(directiveElement.nativeElement.classList.contains('hljs')).toBeTruthy();
  });

  it('should reset text if empty string was passed', () => {
    component.code = '';
    fixture.detectChanges();
    expect(directiveElement.nativeElement.innerHTML).toBe('');
  });

  it('should highlight code reactively', async () => {
    component.language = 'ts';
    component.code = testJsCode;
    fixture.detectChanges();

    let highlightedCode: string = hljs.highlight(testJsCode, {
      language: component.language,
      ignoreIllegals: false
    }).value;

    await afterTimeout(200);
    expect(directiveElement.nativeElement.innerHTML).toBe(highlightedCode);

    // Change code 2nd time with another value
    component.language = 'html';
    component.code = testHtmlCode;
    fixture.detectChanges();

    highlightedCode = hljs.highlight(testHtmlCode, {
      language: component.language,
      ignoreIllegals: false
    }).value;

    await afterTimeout(200);
    expect(directiveElement.nativeElement.innerHTML).toBe(highlightedCode);

    // Change code 3rd time but with empty string
    component.code = '';
    fixture.detectChanges();

    await afterTimeout(200);
    expect(directiveElement.nativeElement.innerHTML).toBe('');

    // Change code 4th time but with nullish value
    component.code = null;
    fixture.detectChanges();

    await afterTimeout(200);
    expect(directiveElement.nativeElement.innerHTML).toBe('');
  });
});
