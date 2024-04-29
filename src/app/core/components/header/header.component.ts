import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageService } from "../../services/local-storage.service";
import { LangService } from "../../../services/lang.service";
import { Subscription } from 'rxjs';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private langChangeSubscription!: Subscription;

  constructor(
    private translate: TranslateService,
    private localstorageService: LocalStorageService,
    private langService: LangService
  ) {}

  ngOnInit() {
    this.langChangeSubscription = this.langService.langChange.subscribe((lang) => {
      var lange= this.localstorageService.getItem('settings.lang');
      if (!lange) {
        lange = 'en';
      }
      this.translate.use(lange);
    });
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  changeLang(lang: 'fr' | 'en') {
    this.translate.use(lang);
    this.localstorageService.setItem('settings.lang', lang);
    this.langService.lang.next(lang);
  }
}
