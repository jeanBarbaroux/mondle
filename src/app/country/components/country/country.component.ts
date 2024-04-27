import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {filter} from 'rxjs';
import {map} from 'rxjs/operators';
import {CountryService} from '../../../core/services/country.service';
import {CompareCountryComponent} from "../compare-country/compare-country.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {CountryGuessed} from "../../../core/models/countryGuessed.model";
import {LocalStorageService} from "../../../core/services/local-storage.service";

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
        TranslateModule
    ],
    providers: [CountryService, LocalStorageService]
})
export class CountryComponent implements OnInit {

    countries: string[] = [];
    countriesTried: CountryGuessed[] = [];
    countryControl = new FormControl();
    allCountries: string[] = [];
    @ViewChild('propositionsContainer') propositionsContainer!: ElementRef;

    constructor(private countryService: CountryService, private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        this.countryService.getAllCountries()
            .subscribe((countryList) => {
                this.allCountries = countryList.sort();
            });

        this.countriesTried = this.localStorageService.getItem('countriesTried');
        this.localStorageService.resetAtMidnight('countriesTried');

        this.countryControl.valueChanges
            .pipe(
                filter(value => value !== null && value !== ''),
                map(value => this.filterCountries(value))
            )
            .subscribe((filteredCountries) => {
                this.countries = filteredCountries;
            });
        this.scrollToBottom()
    }

    filterCountries(filter: string): string[] {
        return this.allCountries.filter(country => country.toLowerCase().includes(filter.toLowerCase()));
    }

    selectCountry(country: string) {
        this.countryService.getCountryGuessed(country)
            .subscribe((countryGuessed) => {
                this.countriesTried.push(countryGuessed);
                this.localStorageService.setItem('countriesTried', this.countriesTried);
                this.allCountries = this.allCountries.filter(c => c !== country);

            });
        this.scrollToBottom();
        this.countryControl.setValue('');
    }

    scrollToBottom(): void {
        setTimeout(() => {
            const elements = document.querySelectorAll('.propositions app-compare-country');
            const lastElement = elements[elements.length - 1];
            if (lastElement) {
                lastElement.scrollIntoView({behavior: 'smooth'});
            }
            console.log(elements.length - 1);
        }, 100);
    }
}
