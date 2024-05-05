import {Component, Input} from '@angular/core';
import {FlagService} from "../../../core/services/flag.service";
import {LangService} from "../../../services/lang.service";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {DomSanitizer} from "@angular/platform-browser";
import {NgIf, NgStyle} from "@angular/common";
import {CountryGuessed} from "../../../core/models/countryGuessed.model";

@Component({
  selector: 'app-guessed-country',
  standalone: true,
  imports: [
    NgStyle,
    NgIf
  ],
  templateUrl: './guessed-country.component.html',
  styleUrl: './guessed-country.component.scss'
})
export class GuessedCountryComponent {
  @Input() countryGuessed!: string;
  flagName!: CountryGuessed;
  flagFound: boolean = false;

  constructor(private flagService: FlagService, private langService: LangService, private localStorageService: LocalStorageService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.flagService.getCountryGuessed(this.countryGuessed).subscribe((countryGuessed) => {
        this.flagFound = countryGuessed.success
        this.flagName = countryGuessed
        this.localStorageService.setItem('flagFound', this.flagFound)

        if (this.flagFound) {
          this.localStorageService.setItem('allFlags', [])
        }
      }
    )
  }

  get displayFlagName() {
    if (typeof this.flagName === 'undefined') {
      return
    }
    const lang = this.localStorageService.getItem('settings.lang');
    return lang === 'fr' ? this.flagName.countryGuessed : this.flagName.countryGuessEnglish;
  }
}
