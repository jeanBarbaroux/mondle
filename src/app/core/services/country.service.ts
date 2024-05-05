import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Country} from '../models/country.model';
import {CountryGuessed} from '../models/countryGuessed.model';


@Injectable()
export class CountryService {
  protected countries: Country[] = [];
  private api = "https://epitaide.com/mondle" // Uncomment this line to use the remote API
  //private api = "http://localhost:7299" // Uncomment this line to use the local API

  constructor(private http: HttpClient) {
  }

  getAllCountries(filter: string = ''): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/api/Game/autocomplete/data/fr`)
      .pipe(
        map(countries => countries.filter(country => country.toLowerCase().includes(filter.toLowerCase())))
      )
  }

  getAllCountriesEn(filter: string = ''): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/api/Game/autocomplete/data/en`)
      .pipe(
        map(countries => countries.filter(country => country.toLowerCase().includes(filter.toLowerCase())))
      );
  }

  getCountryGuessed(country: string): Observable<CountryGuessed> {
    return this.http.get<CountryGuessed>(`${this.api}/api/Game/guess/country/${country}`);
  }

  getCurrencies(): Observable<string> {
    return this.http.get(`${this.api}/api/Game/clue/currency`, {responseType: 'text'});
  }

  getCapitals(): Observable<string> {
    return this.http.get(`${this.api}/api/Game/clue/capital`, {responseType: 'text'});
  }

  getFlags(): Observable<string> {
    return this.http.get(`${this.api}/api/Game/clue/flag`, {responseType: 'text'});
  }
}
