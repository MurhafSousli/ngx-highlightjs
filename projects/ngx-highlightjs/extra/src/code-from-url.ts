import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { CodeLoader } from './code-loader';

@Pipe({
  name: 'codeFromUrl'
})
export class CodeFromUrlPipe implements PipeTransform {

  constructor(private _loader: CodeLoader) {
  }

  transform(url: string): Observable<string> {
    return this._loader.getCodeFromUrl(url);
  }
}
