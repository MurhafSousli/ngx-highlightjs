import { AfterViewInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/delay';
export declare class HighlightDirective implements AfterViewInit, OnDestroy {
    private renderer;
    el: HTMLElement;
    domObs: MutationObserver;
    highlighter$: Subject<any>;
    highlight: any;
    hlAuto: boolean;
    hlDelay: number;
    constructor(el: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
