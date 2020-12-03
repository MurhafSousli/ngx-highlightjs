import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
// import { HighlightLoader } from 'ngx-highlightjs';
// import { Gist } from 'ngx-highlightjs/plus';
import { Gist } from '../../../../ngx-highlightjs/plus/src/public_api';
import { HighlightLoader } from '../../../../ngx-highlightjs/src/public-api';

@Component({
  selector: 'app-gist',
  templateUrl: './gist.component.html',
  styleUrls: ['./gist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GistComponent implements OnInit {

  private _stateSource = new BehaviorSubject<GistState>({
    libLoaded: false,
    gistLoaded: false,
    text: ''
  });

  state$ = this._stateSource.pipe(
    map((state) => ({
      loaded: state.gistLoaded && state.libLoaded,
      text: state.text,
      gist: state.gist
    }))
  );

  @Input() id: string;

  constructor(public hljsLoader: HighlightLoader) {
  }

  ngOnInit() {
    this.setState({ libLoaded: false, gistLoaded: false, text: 'Loading gist...' });
    this.hljsLoader.ready.subscribe(() => this.setState({ libLoaded: true, text: '' }));
  }

  onGistLoad(gist: Gist) {
    this.setState({ gist, gistLoaded: true, text: 'Loading highlight.js library...' });
  }

  private setState(state: GistState) {
    this._stateSource.next({ ...this._stateSource.value, ...state });
  }

}

interface GistState {
  libLoaded?: boolean;
  gistLoaded?: boolean;
  text?: string;
  gist?: Gist;
}
