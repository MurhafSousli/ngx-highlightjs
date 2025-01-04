import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { provideGistOptions } from 'ngx-highlightjs/plus';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideHighlightOptions({
      // fullLibraryLoader: () => import('highlight.js'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml'),
        cs: () => import('highlight.js/lib/languages/csharp'),
      },
      themePath: 'assets/styles/androidstudio.css'
    }),
    provideGistOptions({
      clientId: environment.clientId,
      clientSecret: environment.clientSecret,
    }),
    provideAnimationsAsync()
  ]
};
