import {ApplicationConfig, DEFAULT_CURRENCY_CODE, importProvidersFrom, LOCALE_ID} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {LangService} from './services/lang.service';
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import {TranslateHttpLoader} from "@ngx-translate/http-loader"

import localeFr from '@angular/common/locales/fr';
import localeEN from '@angular/common/locales/en';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

registerLocaleData(localeFr)
registerLocaleData(localeEN)

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    {
      provide: LOCALE_ID,
      deps: [LangService],
      useFactory: (langService: LangService) => langService.lang.value
    },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'fr',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      })
    )
  ]
};
