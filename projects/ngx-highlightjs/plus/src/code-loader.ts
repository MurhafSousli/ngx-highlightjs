import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, EMPTY, catchError, shareReplay } from 'rxjs';
import { Gist, GIST_OPTIONS, GistOptions, isUrl } from './gist.model';

@Injectable({
  providedIn: 'root'
})
export class CodeLoader {

  private _http: HttpClient = inject(HttpClient);

  private _options: GistOptions = inject(GIST_OPTIONS, { optional: true });

  /**
   * Get plus code
   * @param id Gist ID
   */
  getCodeFromGist(id: string): Observable<Gist> {
    let params!: HttpParams;
    if (this._options?.clientId && this._options?.clientSecret) {
      params = new HttpParams().set('client_id', this._options.clientId).set('client_secret', this._options.clientSecret);
    }
    return this.fetchFile(`https://api.github.com/gists/${ id }`, { params, responseType: 'json' });
  }

  /**
   * Get code by URL
   * @param url File raw link
   */
  getCodeFromUrl(url: string): Observable<string> {
    return this.fetchFile(url, { responseType: 'text' });
  }

  private fetchFile(url: string, options: any): Observable<any> {
    // Check if URL is valid
    if (isUrl(url)) {
      return this._http.get(url, options).pipe(
        // Catch response
        shareReplay(1),
        catchError((err: Error) => {
          console.error('[NgxHighlight]: Unable to fetch the URL!', err.message);
          return EMPTY;
        })
      );
    }
    return EMPTY;
  }

}
