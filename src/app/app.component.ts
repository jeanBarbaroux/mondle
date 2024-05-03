import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./core/components/header/header.component";
import {FooterComponent} from "./core/components/footer/footer.component";
import {TranslateService} from "@ngx-translate/core";
import {LocalStorageService} from "./core/services/local-storage.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Mondle';

  constructor(private translate: TranslateService, private localStorageService: LocalStorageService) {}

  ngOnInit() {
    const lang = this.localStorageService.getItem('settings.lang');
    this.translate.use(lang);
  }
}
