import { Directive, ElementRef, Input, NgModule, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';

class HighlightDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.renderer = renderer;
        this.highlighter$ = new Subject();
        this.hlAuto = true;
        this.hlDelay = 200;
        this.el = el.nativeElement;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (typeof hljs === 'undefined') {
            throw new Error('Highlight.js is not loaded.');
        }
        let /** @type {?} */ codeElements = [];
        this.highlighter$.delay(this.hlDelay)
            .switchMap(() => {
            switch (this.highlight) {
                case 'all':
                    codeElements = this.el.querySelectorAll('pre code');
                    break;
                case '':
                    codeElements = [this.el];
                    break;
                default:
                    codeElements = this.el.querySelectorAll(this.highlight);
            }
            return Observable.from(codeElements)
                .take(1)
                .map((code) => {
                /** Highlight only If content is plain text */
                if (code.childNodes.length === 1 && code.childNodes[0].nodeName === '#text') {
                    const /** @type {?} */ highlightedCode = hljs.highlightAuto(code.innerText.trim()).value;
                    /** Render the highlighted code */
                    if (highlightedCode) {
                        this.renderer.setProperty(code, 'innerHTML', highlightedCode);
                    }
                }
            });
        }).subscribe();
        this.highlighter$.next();
        /** Auto highlight on changes */
        if (this.hlAuto) {
            this.domObs = new MutationObserver(() => this.highlighter$.next());
            this.domObs.observe(this.el, { childList: true, subtree: true });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.hlAuto) {
            this.domObs.disconnect();
        }
        this.highlighter$.unsubscribe();
    }
}
HighlightDirective.decorators = [
    { type: Directive, args: [{
                selector: '[highlight]'
            },] },
];
/**
 * @nocollapse
 */
HighlightDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
HighlightDirective.propDecorators = {
    'highlight': [{ type: Input, args: ['highlight',] },],
    'hlAuto': [{ type: Input },],
    'hlDelay': [{ type: Input },],
};

class HighlightModule {
}
HighlightModule.decorators = [
    { type: NgModule, args: [{
                declarations: [HighlightDirective],
                exports: [HighlightDirective]
            },] },
];
/**
 * @nocollapse
 */
HighlightModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { HighlightModule, HighlightDirective as ɵa };
//# sourceMappingURL=ngx-highlightjs.js.map
