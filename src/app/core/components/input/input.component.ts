import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { filter, map } from 'rxjs/operators';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule
  ],
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Output() countrySelected = new EventEmitter<string>();
  countryControl = new FormControl('');
  countries: string[] = [];
  allCountries: string[] = [];

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.getAllCountries()
      .subscribe((countryList) => {
        this.allCountries = countryList.sort();
      });

    this.countryControl.valueChanges
      .pipe(
        filter(value => value !== null && value !== ''),
        map(value => {
          if (!value)
            return this.allCountries;
          return this.filterCountries(value);
        })
      )
      .subscribe((filteredCountries) => {
        this.countries = filteredCountries;
      });
  }

  filterCountries(filter: string): string[] {
    const normalizedFilter = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return this.allCountries.filter(country =>
      country.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalizedFilter)
    );
  }

  selectCountry(country: string) {
    this.countrySelected.emit(country);
    this.countryControl.setValue('');
  }
}
