import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {filter, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {CountryService} from '../../../core/services/country.service';
import {CompareCountryComponent} from "../compare-country/compare-country.component";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {CountryGuessed} from "../../../core/models/countryGuessed.model";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {LangService} from "../../../services/lang.service";
import {SafeHtml} from "@angular/platform-browser";
import {InputComponent} from "../../../core/components/input/input.component";
import {computeStartOfLinePositions} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  standalone: true,
  imports: [
    CompareCountryComponent,
    ReactiveFormsModule,
    AsyncPipe,
    HttpClientModule,
    NgForOf,
    NgIf,
    TranslateModule,
    NgOptimizedImage,
    InputComponent,
  ],
  providers: [CountryService, LocalStorageService]
})
export class CountryComponent implements OnInit {
  countries: string[] = [];
  selectedCountry: string = '';
  countriesTried: CountryGuessed[] = [];
  allCountries: string[] = [];
  allCountriesEn: string[] = [];
  countryFound: boolean = false;
  countryControl = new FormControl({value: '', disabled: this.countryFound});
  private countriesTriedChangeSubscription!: Subscription;
  private countChangeSubscription!: Subscription;
  deactivateFirst: boolean = true;
  deactivateSecond: boolean = true;
  deactivateThird: boolean = true;
  flagHtml: SafeHtml = ''

  @ViewChild(InputComponent) inputComponent!: InputComponent;
  currency = 'CLUE.CURRENCY';
  capital = 'CLUE.CAPITAL';
  flag = 'CLUE.FLAG';
  count: number = 0;

  @ViewChild('propositionsContainer') propositionsContainer!: ElementRef;

  constructor(private countryService: CountryService, private localStorageService: LocalStorageService, private langService: LangService) {
  }

  ngOnInit() {
    this.localStorageService.resetAtMidnight();
    this.countryService.getAllCountries().subscribe((countryList) => {
      this.allCountries = this.localStorageService.getItem('allCountries');
    });
    this.countriesTried = this.localStorageService.getItem('countriesTried');
    this.countryFound = this.localStorageService.getItem('countryFound');
    this.count = this.localStorageService.getItem('count');

    this.countriesTriedChangeSubscription = this.langService.countriesTriedChange.subscribe((countriesTried) => {
      this.countriesTried = countriesTried;
    })
    this.countChangeSubscription = this.langService.countChange.subscribe((count) => {
      this.count = count;
    });
    this.checkCountry();
  }

  ngOnDestroy() {
    if (this.countriesTriedChangeSubscription) {
      this.countriesTriedChangeSubscription.unsubscribe();
    }
    if (this.countChangeSubscription) {
      this.countChangeSubscription.unsubscribe();
    }
  }

  selectCountry(country: string) {
    if (country === '' || this.countryFound) {
      return
    }
    this.countryService.getCountryGuessed(country)
      .subscribe((countryGuessed) => {
        this.countriesTried.reverse()
        this.countriesTried.push(countryGuessed);
        this.countriesTried.reverse()
        this.countryFound = countryGuessed.success;
        this.localStorageService.setItem('countriesTried', this.countriesTried);
        if (this.countryFound) {
          this.localStorageService.setItem('countryFound', this.countryFound);
        }
        this.localStorageService.setItem('allCountries', this.allCountries);
        this.langService.countryFoundChange.emit(this.countryFound);
        this.langService.countriesTried.next(this.countriesTried);
      });
    this.count++;
    this.checkCountry();
    this.localStorageService.setItem('count', this.count);
    this.inputComponent.reset()
  }

  checkCountry() {
    if (this.count >= 5) {
      this.deactivateFirst = false;
    }
    if (this.count >= 10) {
      this.deactivateSecond = false;
    }
    if (this.count >= 15) {
      this.deactivateThird = false;
    }
  }

  getCurrency() {
    this.countryService.getCurrencies()
      .subscribe((currency) => {
        this.currency = currency;
      });
  }

  getCapital() {
    this.countryService.getCapitals()
      .subscribe((capital) => {
        this.capital = capital;
      });
  }

  getFlag() {
    this.countryService.getFlags()
      .subscribe((flag) => {
        this.flagHtml = flag;
        this.flag = ''
      });
  }
}
