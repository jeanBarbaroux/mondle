import {Component, ViewChild} from '@angular/core';
import {CompareCountryComponent} from "../../../country/components/compare-country/compare-country.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {FlagService} from "../../../core/services/flag.service";
import {LangService} from "../../../services/lang.service";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {InputComponent} from "../../../core/components/input/input.component";
import {CountryService} from "../../../core/services/country.service";
import {GuessedCountryComponent} from "../../components/guessed-country/guessed-country.component";

@Component({
  selector: 'app-flag',
  standalone: true,
  imports: [
    CompareCountryComponent,
    FormsModule,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    TranslateModule,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    InputComponent,
    GuessedCountryComponent
  ],
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.scss',
  providers: [FlagService, LangService, LocalStorageService, CountryService],
})
export class FlagComponent {
  countries: string[] = [];
  flagsTried: string[] = [];
  countryFound: boolean = false;
  selectedCountry: string = '';
  flagHtml: SafeHtml = '';
  FlagCount: number = 0;

  @ViewChild(InputComponent) inputComponent!: InputComponent;


  constructor(private flagService: FlagService, private langService: LangService, private localStorageService: LocalStorageService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.flagsTried = this.localStorageService.getItem('flagsTried');
    this.FlagCount = this.localStorageService.getItem('FlagCount');
    this.localStorageService.resetAtMidnight();
    this.flagService.getAllCountries()
      .subscribe((countryList) => {
        let isLocalStorageEmpty = (this.localStorageService.getItem('allCountries')).length
        if (isLocalStorageEmpty !== 0) {
          this.countries = this.localStorageService.getItem('allCountries');
        } else {
          this.countries = countryList.sort();
        }
        this.flagService.getFlagOfTheDay().subscribe((flagSvgData) => {
          this.flagHtml = flagSvgData;
        });
      });
  }

  selectCountry(string: string) {
    if (string === '') {
      return
    }
    this.flagsTried.reverse();
    this.flagsTried.push(string);
    this.flagsTried.reverse();
    this.inputComponent.reset();
    this.FlagCount++;
    this.localStorageService.setItem('flagsTried', this.flagsTried);
    this.localStorageService.setItem('FlagCount', this.FlagCount);
  }
}
