import resolve from 'rollup-plugin-node-resolve';

// Add here external dependencies that actually you use.
const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/add/observable/from': 'Rx.Observable',
    'rxjs/add/observable/zip': 'Rx.Observable',
    'rxjs/add/operator/take': 'Rx.Observable.prototype',
    'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/skipWhile': 'Rx.Observable.prototype',
    'rxjs/add/operator/filter': 'Rx.Observable.prototype',
    'rxjs/add/operator/do': 'Rx.Observable.prototype',
    'rxjs/add/operator/delay': 'Rx.Observable.prototype',
    'highlight.js': 'hljs'
};

export default {
    entry: './dist/modules/ngx-highlightjs.es5.js',
    dest: './dist/bundles/ngx-highlightjs.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'ng.ngxHighlightjs',
    plugins: [resolve()],
    external: Object.keys(globals),
    globals: globals,
    onwarn: () => { return }
}
