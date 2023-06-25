import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient } from '@angular/common/http';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideHttpClient(),
    importProvidersFrom(FlexLayoutServerModule)
  ]
};

export const config = mergeApplicationConfig(serverConfig);
