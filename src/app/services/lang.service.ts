import {Injectable} from '@angular/core';
import {LocalStorageSubject} from "../observables/local-storage-subject";

export type Lang = 'fr' | 'en'

export const DEFAULT_LANGUAGE: Lang = 'en'

@Injectable({
  providedIn: 'root'
})
export class LangService {
  lang: LocalStorageSubject<Lang> = new LocalStorageSubject<Lang>('settings.lang', DEFAULT_LANGUAGE, true)
}
