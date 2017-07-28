(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject'), require('rxjs/Observable'), require('rxjs/add/observable/from'), require('rxjs/add/operator/map'), require('rxjs/add/operator/switchMap'), require('rxjs/add/operator/take'), require('rxjs/add/operator/delay')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Subject', 'rxjs/Observable', 'rxjs/add/observable/from', 'rxjs/add/operator/map', 'rxjs/add/operator/switchMap', 'rxjs/add/operator/take', 'rxjs/add/operator/delay'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.ngxHighlightjs = global.ng.ngxHighlightjs || {}),global.ng.core,global.Rx,global.Rx));
}(this, (function (exports,_angular_core,rxjs_Subject,rxjs_Observable) { 'use strict';

var HighlightDirective = (function () {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    function HighlightDirective(el, renderer) {
        this.renderer = renderer;
        this.highlighter$ = new rxjs_Subject.Subject();
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
            return rxjs_Observable.Observable.from(codeElements)
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
    { type: _angular_core.Directive, args: [{
                selector: '[highlight]'
            },] },
];
/**
 * @nocollapse
 */
HighlightDirective.ctorParameters = function () { return [
    { type: _angular_core.ElementRef, },
    { type: _angular_core.Renderer2, },
]; };
HighlightDirective.propDecorators = {
    'highlight': [{ type: _angular_core.Input, args: ['highlight',] },],
    'hlAuto': [{ type: _angular_core.Input },],
    'hlDelay': [{ type: _angular_core.Input },],
};
var HighlightModule = (function () {
    function HighlightModule() {
    }
    return HighlightModule;
}());
HighlightModule.decorators = [
    { type: _angular_core.NgModule, args: [{
                declarations: [HighlightDirective],
                exports: [HighlightDirective]
            },] },
];
/**
 * @nocollapse
 */
HighlightModule.ctorParameters = function () { return []; };

exports.HighlightModule = HighlightModule;
exports.ɵa = HighlightDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-highlightjs.umd.js.map
