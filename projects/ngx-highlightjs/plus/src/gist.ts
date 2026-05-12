import { Directive, Pipe, PipeTransform, inject, input, output } from '@angular/core';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { CodeLoader } from './code-loader';
import { Gist } from './gist.model';

@Directive({
  selector: '[gist]'
})
export class GistDirective {

  private readonly _loader = inject(CodeLoader);

  readonly gist = input<string>();
  readonly gistLoad = output<Gist>();

  constructor() {
    toObservable(this.gist).pipe(
      filter(Boolean),
      switchMap(id => this._loader.getCodeFromGist(id)),
      takeUntilDestroyed()
    ).subscribe(gist => this.gistLoad.emit(gist));
  }
}

@Pipe({
  name: 'gistFile'
})
export class GistFilePipe implements PipeTransform {
  transform(gist: Gist, fileName: string): string | null {
    return (gist && gist.files && gist.files[fileName]) ? gist.files[fileName].content : null;
  }
}
