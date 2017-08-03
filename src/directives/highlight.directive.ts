import { Directive, AfterViewInit, ElementRef, Renderer2, OnDestroy, Input } from '@angular/core';
import { HighlightService } from '../service/highlight.service';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit, OnDestroy {

  el: HTMLElement;
  domObs: MutationObserver;

  @Input() highlight: string;

  constructor(el: ElementRef, private renderer: Renderer2, private hl: HighlightService) {
    this.el = el.nativeElement;
  }

  ngAfterViewInit() {

    this.hl.highlight(this.renderer, this.el, this.highlight);

    /** Auto highlight on changes */
    if (this.hl.options.auto) {
      this.domObs = new MutationObserver(() => this.hl.highlight(this.renderer, this.el, this.highlight));
      this.domObs.observe(this.el, { childList: true, subtree: true });
    }
  }

  ngOnDestroy() {
    if (this.hl.options.auto) {
      this.domObs.disconnect();
    }
  }
}
