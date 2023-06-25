import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HighlightLoader } from 'ngx-highlightjs';
import { Gist } from 'ngx-highlightjs/plus';
import { GistComponent } from './gist/gist.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    NgScrollbarModule,
    FlexLayoutModule,
    HeaderComponent,
    GistComponent
  ]
})
export class AppComponent implements OnInit {

  gist!: Gist;

  codeUrl = 'https://raw.githubusercontent.com/MurhafSousli/ngx-highlightjs/master/README.md';

  // Gist id
  gistId = '6fd1b8fe940ded9f792335addb60c809';

  // Themes
  theme = 'androidstudio';
  styles = [
    'a11y-dark',
    'a11y-light',
    'agate',
    'an-old-hope',
    'androidstudio',
    'arduino-light',
    'arta',
    'ascetic',
    'atom-one-dark-reasonable',
    'atom-one-dark',
    'atom-one-light',
    'brown-paper',
    'codepen-embed',
    'color-brewer',
    'dark',
    'default',
    'devibeans',
    'docco',
    'far',
    'felipec',
    'foundation',
    'github-dark-dimmed',
    'github-dark',
    'github',
    'gml',
    'googlecode',
    'gradient-dark',
    'gradient-light',
    'grayscale',
    'hybrid',
    'idea',
    'intellij-light',
    'ir-black',
    'isbl-editor-dark',
    'isbl-editor-light',
    'kimbie-dark',
    'kimbie-light',
    'lightfair',
    'lioshi',
    'magula',
    'mono-blue',
    'monokai-sublime',
    'monokai',
    'night-owl',
    'nnfx-dark',
    'nnfx-light',
    'nord',
    'obsidian',
    'panda-syntax-dark',
    'panda-syntax-light',
    'paraiso-dark',
    'paraiso-light',
    'pojoaque',
    'purebasic',
    'qtcreator-dark',
    'qtcreator-light',
    'rainbow',
    'routeros',
    'school-book',
    'shades-of-purple',
    'srcery',
    'stackoverflow-dark',
    'stackoverflow-light',
    'sunburst',
    'tokyo-night-dark',
    'tokyo-night-light',
    'tomorrow-night-blue',
    'tomorrow-night-bright',
    'vs',
    'vs2015',
    'xcode',
    'xt256',
  ];

  constructor(private hljsLoader: HighlightLoader) {
  }

  ngOnInit(): void {
    this.changeTheme();
  }

  changeTheme(): void {
    this.hljsLoader.setTheme(`//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${ this.theme }.min.css`);
  }

}
