import {EventEmitter, Injectable} from '@angular/core';
import {LocalStorageSubject} from "../observables/local-storage-subject";
import {Subject} from 'rxjs';
import {CountryGuessed} from "../core/models/countryGuessed.model";
import {LocalStorageService} from "../core/services/local-storage.service";

export type Lang = 'fr' | 'en'

export const DEFAULT_LANGUAGE: Lang = 'fr'

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
  countryFound: LocalStorageSubject<boolean> = new LocalStorageSubject<boolean>('countryFound', false, true);
  countryFoundChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private localStorageService: LocalStorageService) {
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
      if (event.key === 'countryFound') {
        this.countryFoundChange.next(this.countryFound.value);
      }
    });
  }
}
