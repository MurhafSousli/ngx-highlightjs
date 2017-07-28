import { Directive, ElementRef, Input, NgModule, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';
var HighlightDirective = (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    function HighlightDirective(el, renderer) {
        this.renderer = renderer;
        this.highlighter$ = new Subject();
        this.hlAuto = true;
        this.hlDelay = 200;
        this.el = el.nativeElement;
    }
    /**
     * @return {?}
     */
    HighlightDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (typeof hljs === 'undefined') {
            throw new Error('Highlight.js is not loaded.');
        }
        var /** @type {?} */ codeElements = [];
        this.highlighter$.delay(this.hlDelay)
            .switchMap(function () {
            switch (_this.highlight) {
                case 'all':
                    codeElements = _this.el.querySelectorAll('pre code');
                    break;
                case '':
                    codeElements = [_this.el];
                    break;
                default:
                    codeElements = _this.el.querySelectorAll(_this.highlight);
            }
            return Observable.from(codeElements)
                .take(1)
                .map(function (code) {
                /** Highlight only If content is plain text */
                if (code.childNodes.length === 1 && code.childNodes[0].nodeName === '#text') {
                    var /** @type {?} */ highlightedCode = hljs.highlightAuto(code.innerText.trim()).value;
                    /** Render the highlighted code */
                    if (highlightedCode) {
                        _this.renderer.setProperty(code, 'innerHTML', highlightedCode);
                    }
                }
            });
        }).subscribe();
        this.highlighter$.next();
        /** Auto highlight on changes */
        if (this.hlAuto) {
            this.domObs = new MutationObserver(function () { return _this.highlighter$.next(); });
            this.domObs.observe(this.el, { childList: true, subtree: true });
        }
    };
    /**
     * @return {?}
     */
    HighlightDirective.prototype.ngOnDestroy = function () {
        if (this.hlAuto) {
            this.domObs.disconnect();
        }
        this.highlighter$.unsubscribe();
    };
    return HighlightDirective;
}());
HighlightDirective.decorators = [
    { type: Directive, args: [{
                selector: '[highlight]'
            },] },
];
/**
 * @nocollapse
 */
HighlightDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
]; };
HighlightDirective.propDecorators = {
    'highlight': [{ type: Input, args: ['highlight',] },],
    'hlAuto': [{ type: Input },],
    'hlDelay': [{ type: Input },],
};
var HighlightModule = (function () {
    function HighlightModule() {
    }
    return HighlightModule;
}());
HighlightModule.decorators = [
    { type: NgModule, args: [{
                declarations: [HighlightDirective],
                exports: [HighlightDirective]
            },] },
];
/**
 * @nocollapse
 */
HighlightModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { HighlightModule, HighlightDirective as ɵa };
//# sourceMappingURL=ngx-highlightjs.es5.js.map
