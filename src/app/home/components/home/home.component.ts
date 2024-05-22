import {Component} from '@angular/core';
import {ButtonsComponent} from "../../../buttons/buttons.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonsComponent,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
