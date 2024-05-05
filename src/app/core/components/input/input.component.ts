import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";
import {CountryService} from "../../services/country.service";
import {LangService} from "../../../services/lang.service";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-input',
  templateUrl: 'input.component.html',
  standalone: true,
  imports: [
    MatLabel,
    MatAutocompleteTrigger,
    MatAutocomplete,
    AsyncPipe,
    MatOption,
    MatInput,
    MatFormField,
    TranslateModule,
    ReactiveFormsModule,
    NgForOf
  ],
  styleUrls: ['input.component.scss']
})
export class InputComponent implements OnInit {
  options: string[] = ['One', 'Two', 'Three'];
  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;

  @Output() countrySelected = new EventEmitter<string>();

  constructor(private countryService: CountryService, private localStorageService: LocalStorageService, private langService: LangService) {
  }

  ngOnInit() {
    this.updateCountryList();
    this.langService.langChange.subscribe((newLang) => {
      console.log('newLang', newLang)
      this.updateCountryList(newLang);
    });
  }

  updateCountryList(lang?: string) {
    lang = lang || this.localStorageService.getItem('settings.lang');
    let list = this.countryService.getAllCountries();
    if (lang === 'en') {
      list = this.countryService.getAllCountriesEn();
    }
    list.subscribe((countries) => {
      countries.sort()
      this.options = countries;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      this.myControl.valueChanges.subscribe((value) => {
        this.countrySelected.emit(value);
      })
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  reset() {
    //reset the value contained in the input
    this.myControl.setValue('');
  }
}
