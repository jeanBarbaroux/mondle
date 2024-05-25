import {Component, ElementRef, Input, Renderer2} from '@angular/core';
import {InformationGuess} from "../../../core/models/countryGuessed.model";
import {NgForOf, NgStyle} from "@angular/common";
import {NumberFormatPipe} from "../../pipe/number-format.pipe";

@Component({
  selector: 'app-compared-item',
  templateUrl: './compared-item.component.html',
  standalone: true,
  imports: [
    NgStyle,
    NgForOf,
    NumberFormatPipe
  ],
  styleUrls: ['./compared-item.component.scss']
})
export class ComparedItemComponent {
  @Input() index!: string;
  @Input() indications!: InformationGuess;
  class!: string;
  private el: ElementRef;
  private renderer: Renderer2;

  constructor(el: ElementRef, renderer: Renderer2) {
    this.el = el;
    this.renderer = renderer;
  }

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

  ngAfterViewInit() {
  this.adjustAlignment();
  window.addEventListener('resize', this.adjustAlignment.bind(this));
}

adjustAlignment() {
  const elements = this.el.nativeElement.querySelectorAll('.front, .back');

  elements.forEach((element: HTMLElement) => {
    if (element.scrollHeight > element.clientHeight) {
      this.renderer.setStyle(element, 'align-items', 'flex-start');
    } else {
      this.renderer.setStyle(element, 'align-items', 'center');
    }
  });
}
}
