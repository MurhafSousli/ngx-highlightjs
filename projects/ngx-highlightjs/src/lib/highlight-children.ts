import { Directive, AfterContentInit, Input, Renderer2, ElementRef, NgZone } from '@angular/core';
import { HighlightJS } from './highlight.service';

@Directive({
  selector: '[highlightChildren]'
})
export class HighlightChildren implements AfterContentInit {

  @Input('highlightChildren') selector: string;

  constructor(private _zone: NgZone, private _el: ElementRef, private _hljs: HighlightJS, private _renderer: Renderer2) {
  }

  ngAfterContentInit() {
    this.highlightChildren(this.selector);
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
    this._zone.runOutsideAngular(() => {
      const elementsToHighlight = this._el.nativeElement.querySelectorAll(selector || 'code');

      elementsToHighlight.forEach((element: HTMLElement) => {
        // Highlight element when text is present
        const observer = new MutationObserver(() => {
          if (
            element.childNodes.length === 1 &&
            element.childNodes[0].nodeName === '#text'
          ) {
            this.highlightElement(element);
          }
          observer.disconnect();
        });
        observer.observe(element, {childList: true});
      });
    });
  }
}
