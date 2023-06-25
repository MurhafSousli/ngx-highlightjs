import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BehaviorSubject, map } from 'rxjs';
import { HighlightLoader } from 'ngx-highlightjs';
import { Gist, HighlightPlusModule } from 'ngx-highlightjs/plus';
import { CodeComponent } from '../code/code.component';

@Component({
  selector: 'app-gist',
  templateUrl: './gist.component.html',
  styleUrls: ['./gist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressBarModule,
    HighlightPlusModule,
    CodeComponent
  ]
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
