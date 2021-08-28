import { Component, ChangeDetectionStrategy } from '@angular/core';
import { animationFrameScheduler } from 'rxjs';
import { Gist } from 'ngx-highlightjs/plus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  gist!: Gist;

  codeUrl = 'https://raw.githubusercontent.com/MurhafSousli/ngx-highlightjs/master/README.md';

  // Gist id
  gistId = '6fd1b8fe940ded9f792335addb60c809';

  // Themes
  theme = 'androidstudio';
  styles = [
    'vs',
    'rainbow',
    'dracula',
    'androidstudio',
    'agate',
    'zenburn',
    'agate',
    'color-brewer',
    'atom-one-dark',
    'atom-one-light',
    'github',
    'solarized-light',
    'solarized-dark',
    'railscasts',
    'tomorrow',
    'monokai-sublime',
    'mono-blue',
    'default',
  ];

  changeTheme() {
    let disablePreviousTheme;
    document.head.querySelectorAll('.codestyle').forEach((linkElement: HTMLLinkElement) => {
      const disabled = linkElement.href.substr(linkElement.href.lastIndexOf('/') + 1) !== `${this.theme}.css`;
      if (!linkElement.disabled) {
        disablePreviousTheme = linkElement;
      } else {
        linkElement.disabled = disabled;
      }
    });
    animationFrameScheduler.schedule(() => disablePreviousTheme.disabled = true);
  }

}
