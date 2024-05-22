import {Component, Input} from '@angular/core';
import {DecimalPipe, NgForOf, NgStyle, UpperCasePipe} from "@angular/common";
import {TranslateService} from '@ngx-translate/core';
import {CountryGuessed} from "../../../core/models/countryGuessed.model";
import {ComparedItemComponent} from "../compared-item/compared-item.component";
import {LocalStorageService} from "../../../core/services/local-storage.service";

@Component({
  selector: 'app-compare-country',
  standalone: true,
  templateUrl: './compare-country.component.html',
  styleUrls: ['./compare-country.component.scss'],
  imports: [
    NgStyle,
    DecimalPipe,
    UpperCasePipe,
    ComparedItemComponent,
    NgForOf,
  ],
})
export class CompareCountryComponent {
  @Input() countryGuessed!: CountryGuessed;
  countryName: string = '';
  protected readonly String = String;

  constructor(private translate: TranslateService, private localStorageService: LocalStorageService) {
  }

  get displayCountryName() {
    const lang = this.localStorageService.getItem('settings.lang');
    return lang === 'fr' ? this.countryGuessed.countryGuessed : this.countryGuessed.countryGuessEnglish;
  }

  ngOnInit() {
  }
}
