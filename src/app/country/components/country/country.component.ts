import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CountryService} from '../../../core/services/country.service';
import {CompareCountryComponent} from "../compare-country/compare-country.component";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {CountryGuessed, InformationGuess} from "../../../core/models/countryGuessed.model";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {LangService} from "../../../services/lang.service";
import {InputComponent} from "../../../core/components/input/input.component";
import {ComparedItemComponent} from "../compared-item/compared-item.component";

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
    ComparedItemComponent,
  ],
  providers: [CountryService, LocalStorageService]
})
export class CountryComponent implements OnInit {
  selectedCountry: string = '';
  countriesTried: CountryGuessed[] = [];
  allCountries: string[] = [];
  countryFound: boolean = false;
  deactivateFirst: boolean = true;
  deactivateSecond: boolean = true;
  deactivateThird: boolean = true;
  flagHtml!: string;

  @ViewChild(InputComponent) inputComponent!: InputComponent;
  currency = 'CLUE.CURRENCY';
  capital = 'CLUE.CAPITAL';
  flag = 'CLUE.FLAG';
  count: number = 0;

  @ViewChild('propositionsContainer') propositionsContainer!: ElementRef;

  constructor(private countryService: CountryService, private localStorageService: LocalStorageService, private langService: LangService
  ) {
  }

  ngOnInit() {
    this.localStorageService.resetAtMidnight();
    this.countriesTried = this.localStorageService.getItem('countriesTried');
    this.countryFound = this.localStorageService.getItem('countryFound');
    this.count = this.localStorageService.getItem('count');

    this.checkCountry();
  }

  selectCountry(country: string
  ) {
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
