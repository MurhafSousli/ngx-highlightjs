import { inject, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { CodeLoader } from './code-loader';
import { HIGHLIGHT_FILE_LOCATION, CodeFileLocation } from './code-file-location';
import { isUrl } from './gist.model';

@Pipe({
  name: 'codeFromUrl'
})
export class CodeFromUrlPipe implements PipeTransform {

  private _location: CodeFileLocation = inject(HIGHLIGHT_FILE_LOCATION);

  private _loader: CodeLoader = inject(CodeLoader);

  transform(url: string): Observable<string> {
    return this._loader.getCodeFromUrl(isUrl(url) ? url : `${ this._location.getPathname() }/${ url }`);
  }
}
