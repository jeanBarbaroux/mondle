import {Component, Input} from '@angular/core';
import { SlideInOutAnimation } from './animation';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-animated-element',
  templateUrl: './animated-element.component.html',
  styleUrls: ['./animated-element.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  animations: [SlideInOutAnimation]
})
export class AnimatedElementComponent  {
  @Input() animationState = 'out';
  @Input() title!: string;
  @Input() description!: string;

  static currentIn: AnimatedElementComponent | null = null;

  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      if (AnimatedElementComponent.currentIn) {
        AnimatedElementComponent.currentIn.animationState = 'out';
      }
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      AnimatedElementComponent.currentIn = this.animationState === 'in' ? this : null;
    }
  }
}
