import {Component} from '@angular/core';
import {StatGameComponent} from "../stat-game/stat-game.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    StatGameComponent,
    TranslateModule
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {

}
