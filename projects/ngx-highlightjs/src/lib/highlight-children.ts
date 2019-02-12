import { Directive, Input, Inject, OnInit, OnDestroy, Renderer2, ElementRef, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HighlightJS } from './highlight.service';

@Directive({
  selector: '[highlightChildren]'
})
export class HighlightChildren implements OnInit, OnDestroy {

  @Input('highlightChildren') selector: string;
  private _observer: any;

  constructor(private _zone: NgZone,
              private _el: ElementRef,
              private _hljs: HighlightJS,
              private _renderer: Renderer2,
              @Inject(PLATFORM_ID) private _platformId: Object) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      // Subscribe to host element content changes
      this._zone.runOutsideAngular(() => {
        this._observer = new MutationObserver(() =>
          this.highlightChildren(this.selector)
        );

        this._observer.observe(this._el.nativeElement, {
          childList: true
        });
      });
    }
  }

  /**
   * Highlight a code block
   * @param el Code block element
   */
  highlightElement(el: HTMLElement) {
    this._hljs.highlightBlock(el);
    this._renderer.addClass(el, 'hljs');
  }

  /**
   * Highlight multiple code blocks
   * @param selector elements selector
   */
  highlightChildren(selector: string) {
    const elementsToHighlight = this._el.nativeElement.querySelectorAll(selector || 'pre code');

    elementsToHighlight.forEach((element: HTMLElement) => {
      // Highlight element when text is present
      if (
        element.childNodes.length === 1 &&
        element.childNodes[0].nodeName === '#text'
      ) {
        this.highlightElement(element);
      }
    });
  }

  ngOnDestroy() {
    this._observer.disconnect();
  }
}
