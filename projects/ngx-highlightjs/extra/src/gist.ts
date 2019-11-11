import { Directive, Input, Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { CodeLoader } from './code-loader';
import { Gist } from './gist.model';

@Directive({
  selector: '[gist]',
  exportAs: 'gist'
})
export class GistDirective {

  private _gist: Gist;

  get value(): Gist {
    return this._gist;
  }

  constructor(private _cd: ChangeDetectorRef, private _loader: CodeLoader) {
  }

  @Input()
  private set gist(value: any) {
    this._loader.getCodeFromGist(value).subscribe((gist: Gist) => {
      this._gist = gist;
      this._cd.detectChanges();
    });
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
