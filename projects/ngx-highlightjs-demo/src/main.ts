import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { GIST_OPTIONS } from 'ngx-highlightjs/plus';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(BrowserModule.withServerTransition({ appId: 'serverApp' })),
      provideHttpClient(),
      {
        provide: HIGHLIGHT_OPTIONS,
        useValue: {
          // fullLibraryLoader: () => import('highlight.js'),
          lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
          coreLibraryLoader: () => import('highlight.js/lib/core'),
          languages: {
            typescript: () => import('highlight.js/lib/languages/typescript'),
            css: () => import('highlight.js/lib/languages/css'),
            xml: () => import('highlight.js/lib/languages/xml')
          },
          themePath: 'assets/styles/androidstudio.css'
        }
      },
      {
        provide: GIST_OPTIONS,
        useValue: {
          // clientId:
          // clientSecret:
        }
      },
      provideAnimations()
    ]
  })
    .catch(err => console.error(err));
};


if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}

