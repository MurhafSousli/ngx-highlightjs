import resolve from 'rollup-plugin-node-resolve';

// Add here external dependencies that actually you use.
const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/observable/from': 'Rx',
    'rxjs/add/operator/take': 'Rx.Observable.prototype',
    'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/filter': 'Rx.Observable.prototype',
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
