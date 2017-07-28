import { NgModule } from '@angular/core';
import { HighlightDirective } from './../directives/highlight.directive';

@NgModule({
    declarations: [HighlightDirective],
    exports: [HighlightDirective]
})
export class HighlightModule { }
