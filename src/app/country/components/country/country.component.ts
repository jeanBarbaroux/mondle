import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {filter, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {CountryService} from '../../../core/services/country.service';
import {CompareCountryComponent} from "../compare-country/compare-country.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {CountryGuessed} from "../../../core/models/countryGuessed.model";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {LangService} from "../../../services/lang.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

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
  ],
  providers: [CountryService, LocalStorageService]
})
export class CountryComponent implements OnInit {

  countries: string[] = [];
  countriesTried: CountryGuessed[] = [];
  allCountries: string[] = [];
  countryFound: boolean = false;
  countryControl = new FormControl({value: '', disabled: this.countryFound});
  private countriesTriedChangeSubscription!: Subscription;
  private countChangeSubscription!: Subscription;
  deactivateFirst: boolean = true;
  deactivateSecond: boolean = true;
  deactivateThird: boolean = true;
  flagHtml: SafeHtml = ''

  currency = 'CLUE.CURRENCY';
  capital = 'CLUE.CAPITAL';
  flag = 'CLUE.FLAG';
  count: number = 0;
  clueActivated() {
    console.log('clue activated')
  }

  @ViewChild('propositionsContainer') propositionsContainer!: ElementRef;

  constructor(private countryService: CountryService, private localStorageService: LocalStorageService, private langService: LangService, private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.countryService.getAllCountries()
      .subscribe((countryList) => {
        let isLocalStorageEmpty = (this.localStorageService.getItem('allCountries')).length
        if (isLocalStorageEmpty !== 0) {
          this.allCountries = this.localStorageService.getItem('allCountries');
        }
        else {
          this.allCountries = countryList.sort();
        }
      });

    this.countriesTried = this.localStorageService.getItem('countriesTried');
    this.countryFound = this.localStorageService.getItem('countryFound');
    this.count = this.localStorageService.getItem('count');
    this
    // Ne pas mettre if (this.countryFound) car si nouveau jour alors countryFound = [] donc true
    if (this.countryFound === true) {
      this.countryControl.disable();
    } else {
      this.countryControl.enable();
    }

    this.localStorageService.resetAtMidnight('countriesTried');
    this.localStorageService.resetAtMidnight('countryFound');
    this.localStorageService.resetAtMidnight('allCountries');
    this.localStorageService.resetAtMidnight('count');

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
    this.scrollToBottom()
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

  filterCountries(filter: string): string[] {
    return this.allCountries.filter(country => country.toLowerCase().includes(filter.toLowerCase()));
  }

  selectCountry(country: string) {
    this.countryService.getCountryGuessed(country)
      .subscribe((countryGuessed) => {
        this.countriesTried.push(countryGuessed);
        this.countryFound = countryGuessed.success;
        this.localStorageService.setItem('countriesTried', this.countriesTried);
        if (this.countryFound) {
          this.localStorageService.setItem('countryFound', this.countryFound);
        }
        this.allCountries = this.allCountries.filter(c => c !== country);
        this.localStorageService.setItem('allCountries', this.allCountries);
        this.langService.countriesTried.next(this.countriesTried);
        if (this.countryFound) {
          this.countryControl.disable();
        } else {
          this.countryControl.setValue('');
        }
      });
    this.scrollToBottom();
    this.count++;
    this.checkCountry();
    this.localStorageService.setItem('count', this.count);
    this.countryControl.setValue('');
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const elements = document.querySelectorAll('.propositions app-compare-country');
      const lastElement = elements[elements.length - 1];
      if (lastElement) {
        lastElement.scrollIntoView({behavior: 'smooth'});
      }
    }, 100);
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
      this.http.get(flag, {responseType: 'text'}).subscribe(
        (data) => {
          if (data.startsWith('<svg')) {
            data = data.replace('<svg', '<svg height="34px""');
            data = data.replace('width=', '');
          }
          this.flagHtml = this.sanitizer.bypassSecurityTrustHtml(data);
          this.flag = '';
        }
      );
    });
}
}
