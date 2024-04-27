import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Country} from '../models/country.model';
import {CountryGuessed} from '../models/countryGuessed.model';


@Injectable()
export class CountryService {
    protected countries: Country[] = [];
    private api = "https://epitaide.com"

    constructor(private http: HttpClient) {
    }

    getAllCountries(filter: string = ''): Observable<string[]> {
        return this.http.get<string[]>(`${this.api}/api/Countries/autocomplete/data/fr`)
            .pipe(
                map(countries => countries.filter(country => country.toLowerCase().includes(filter.toLowerCase())))
            );
    }

    getCountryGuessed(country: string): Observable<CountryGuessed> {
        return this.http.get<CountryGuessed>(`${this.api}/api/Countries/guess/${country}`);
    }
}
