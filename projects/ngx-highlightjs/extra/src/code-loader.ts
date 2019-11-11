import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError, publishReplay, refCount } from 'rxjs/operators';
import { Gist, GIST_OPTIONS, GistOptions } from './gist.model';

@Injectable({
  providedIn: 'root'
})
export class CodeLoader {
  constructor(private _http: HttpClient, @Optional() @Inject(GIST_OPTIONS) private _options: GistOptions) {
  }

  /**
   * Get extra code
   * @param id Gist ID
   */
  getCodeFromGist(id: string): Observable<Gist> {
    let params: HttpParams;
    if (this.isOAuthProvided()) {
      params = new HttpParams().set('client_id', this._options.clientId).set('client_secret', this._options.clientSecret);
    }
    return this.fetchFile(`https://api.github.com/gists/${id}`, { params, responseType: 'json' });
  }

  /**
   * Get code by URL
   * @param url File raw link
   */
  getCodeFromUrl(url: string): Observable<string> {
    return this.fetchFile(url, { responseType: 'text' });
  }

  /**
   * Check if OAuth option is provided
   */
  private isOAuthProvided(): boolean {
    return !!this._options && !!this._options.clientId && !!this._options.clientSecret;
  }

  private fetchFile(url: string, options: any): Observable<any> {
    // Check if URL is valid
    if (isUrl(url)) {
      return this._http.get(url, options).pipe(
        // Catch response
        publishReplay(1),
        refCount(),
        catchError((err: Error) => {
          console.error('[NgxHighlight]: Unable to fetch the URL!', err.message);
          return EMPTY;
        })
      );
    }
    return EMPTY;
  }

}

function isUrl(url: string) {
  const regExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regExp.test(url);
}
