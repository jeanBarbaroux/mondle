import {Component, Input} from '@angular/core';
import {InformationGuess} from "../../../core/models/countryGuessed.model";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-compared-item',
  templateUrl: './compared-item.component.html',
  standalone: true,
  imports: [
    NgStyle
  ],
  styleUrls: ['./compared-item.component.scss']
})
export class ComparedItemComponent {
  @Input() index!: string;
  @Input() indications!: InformationGuess;
  class!: string;

  ngOnInit() {
    switch (this.index) {
      case '1':
        this.class = 'one';
        break;
      case '2':
        this.class = 'two';
        break;
      case '3':
        this.class = 'three';
        break;
      case '4':
        this.class = 'four';
        break;
      case '5':
        this.class = 'five';
        break;
      case '6':
        this.class = 'six';
        break;
      default:
        break;
    }
  }
}
