import { Directive, Pipe, Input, Output, PipeTransform, EventEmitter, inject } from '@angular/core';
import { CodeLoader } from './code-loader';
import { Gist } from './gist.model';

@Directive({
  selector: '[gist]'
})
export class GistDirective {

  private _loader: CodeLoader = inject(CodeLoader);

  @Input()
  set gist(value: string) {
    if (value) {
      this._loader.getCodeFromGist(value).subscribe((gist: Gist) => this.gistLoad.emit(gist));
    }
  }

  @Output() gistLoad: EventEmitter<Gist> = new EventEmitter<Gist>();
}

@Pipe({
  name: 'gistFile'
})
export class GistFilePipe implements PipeTransform {
  transform(gist: Gist, fileName: string): string | null {
    return (gist && gist.files && gist.files[fileName]) ? gist.files[fileName].content : null;
  }
}
