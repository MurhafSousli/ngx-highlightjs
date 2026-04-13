import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { Component, DebugElement, PLATFORM_ID } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HighlightAuto, HighlightLoader } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import hljs from 'highlight.js';
import { afterTimeout, highlightLoaderStub } from './common-tests';

@Component({
  template: `<code [highlightAuto]="code"></code>`,
  imports: [HighlightAuto]
})
class TestHighlightComponent {
  code: string;
}

@Component({
  template: `<code [highlightAuto]="code" lineNumbers></code>`,
  imports: [HighlightAuto, HighlightLineNumbers]
})
class TestHighlightWithLineNumbersComponent {
  code: string;
}

describe('HighlightAuto Directive', () => {
  let component: TestHighlightComponent;
  let directiveElement: DebugElement;
  let directiveInstance: HighlightAuto;
  let fixture: ComponentFixture<TestHighlightComponent>;

  const testJsCode: string = 'console.log(&quot;test&quot;)';
  const testHtmlCode: string = '<div class=&quot;my-class&quot;></div>';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightAuto, HighlightLineNumbers, TestHighlightComponent, TestHighlightWithLineNumbersComponent],
      providers: [
        { provide: HighlightLoader, useValue: highlightLoaderStub },
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHighlightComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(HighlightAuto));
    directiveInstance = directiveElement.injector.get(HighlightAuto);
  });

  it('should create highlightAuto directive add hljs class', () => {
    expect(directiveInstance).toBeTruthy();
    expect(directiveElement.nativeElement.classList.contains('hljs')).toBeTruthy();
  });

  it('should reset text if empty string was passed', () => {
    component.code = '';
    fixture.detectChanges();
    expect(directiveElement.nativeElement.innerHTML).toBe('');
  });

  it('should highlight given text and highlight another text when change', async () => {
    component.code = testJsCode;
    fixture.detectChanges()

    let highlightedCode: string = hljs.highlightAuto(testJsCode, null).value;

    await afterTimeout(200);
    expect(directiveElement.nativeElement.innerHTML).toBe(highlightedCode);

    // Change code 2nd time with another value
    component.code = testHtmlCode;
    fixture.detectChanges();

    highlightedCode = hljs.highlightAuto(testHtmlCode, null).value;

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

  it('should keep highlighted html on the server when lineNumbers is used', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [HighlightAuto, HighlightLineNumbers, TestHighlightWithLineNumbersComponent],
      providers: [
        { provide: HighlightLoader, useValue: highlightLoaderStub },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: PLATFORM_ID, useValue: 'server' }
      ]
    }).compileComponents();

    const serverFixture = TestBed.createComponent(TestHighlightWithLineNumbersComponent);
    const serverComponent = serverFixture.componentInstance;
    const serverDirectiveElement = serverFixture.debugElement.query(By.directive(HighlightAuto));

    serverComponent.code = testJsCode;
    serverFixture.detectChanges();

    await serverFixture.whenStable();
    await afterTimeout(50);

    expect(serverDirectiveElement.nativeElement.innerHTML).toBe(hljs.highlightAuto(testJsCode, null).value);
  });
});
