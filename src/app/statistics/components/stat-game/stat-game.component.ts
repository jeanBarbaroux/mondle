import {Component, Input} from '@angular/core';
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {NgForOf} from "@angular/common";
import {Stats} from "../../../core/models/stats.model";
import {scaleLinear} from "d3-scale";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-stat-game',
  standalone: true,
  imports: [
    NgForOf,
    TranslateModule
  ],
  templateUrl: './stat-game.component.html',
  styleUrl: './stat-game.component.scss'
})
export class StatGameComponent {
  @Input() name!: string;
  stats!: Stats[]
  numberOfGames: number = 0;
  numberOfWins: number = 0;
  averageTries: number = 0;
  history: string[] = [];

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    if (this.name === 'flag') {
      this.stats = this.localStorageService.getItem('FlagStatistics')
    } else {
      this.stats = this.localStorageService.getItem('CountryStatistics')
    }
    this.numberOfGames = this.stats.length;
    this.numberOfWins = this.stats.filter(stat => stat.success).length;
    if (this.numberOfGames > 0) {
      this.averageTries = this.stats.reduce((acc, stat) => acc + stat.count, 0) / this.numberOfGames;
      this.averageTries = Math.round(this.averageTries * 100) / 100;
    }
    const maxCount = Math.max(...this.stats.map(stat => stat.count));
    const colorScale = scaleLinear<string>()
      .domain([0, maxCount])
      .range(['#FFFFFF', '#0000ff']);
    const today = new Date();
    for (let i = 0; i < 364; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const dateString = date.toLocaleDateString();
      const stat = this.stats.find(stat => stat.date === dateString);
      if (stat) {
        this.history.push(colorScale(stat.count));
      } else {
        this.history.push('#FFFFFF'); // white color for count 0
      }
    }
    this.history.reverse();
  }

  protected readonly length = length;
}
