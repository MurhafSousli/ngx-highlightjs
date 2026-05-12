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
    let params: HttpParams | undefined;
    if (this._options?.clientId && this._options?.clientSecret) {
      params = new HttpParams()
        .set('client_id', this._options.clientId)
        .set('client_secret', this._options.clientSecret);
    }
    const url = `https://api.github.com/gists/${ id }`;
    if (!isUrl(url)) return EMPTY;
    return this._http.get<Gist>(url, { params }).pipe(
      shareReplay(1),
      catchError((err: Error) => {
        console.error('[NgxHighlight]: Unable to fetch the URL!', err.message);
        return EMPTY;
      })
    );
  }

  /**
   * Get code by URL
   * @param url File raw link
   */
  getCodeFromUrl(url: string): Observable<string> {
    if (!isUrl(url)) return EMPTY;
    return this._http.get(url, { responseType: 'text' }).pipe(
      shareReplay(1),
      catchError((err: Error) => {
        console.error('[NgxHighlight]: Unable to fetch the URL!', err.message);
        return EMPTY;
      })
    );
  }
}
