import { Injectable } from '@angular/core';
import { LocalStorageSubject } from "../observables/local-storage-subject";
import { Observable, Subject } from 'rxjs';
import {CountryGuessed} from "../core/models/countryGuessed.model";
import {Country} from "../core/models/country.model";

export type Lang = 'fr' | 'en'

export const DEFAULT_LANGUAGE: Lang = 'en'

@Injectable({
  providedIn: 'root'
})
export class LangService {
  lang: LocalStorageSubject<Lang> = new LocalStorageSubject<Lang>('settings.lang', DEFAULT_LANGUAGE, true);
  countriesTried: LocalStorageSubject<CountryGuessed[]> = new LocalStorageSubject<CountryGuessed[]>('countriesTried', [], true);
  count: LocalStorageSubject<number> = new LocalStorageSubject<number>('count', 0, true);
  countriesTriedChange: Subject<CountryGuessed[]> = new Subject<CountryGuessed[]>();
  langChange: Subject<Lang> = new Subject<Lang>();
  countChange: Subject<number> = new Subject<number>();

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'settings.lang') {
        this.langChange.next(this.lang.value);
      }
      if (event.key === 'countriesTried') {
        this.countriesTriedChange.next(this.countriesTried.value);
      }
      if (event.key === 'count') {
        this.countChange.next(this.count.value);
      }
    });
  }
}
