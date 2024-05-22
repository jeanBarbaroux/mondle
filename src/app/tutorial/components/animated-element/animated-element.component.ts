import {Component, Input} from '@angular/core';
import {SlideInOutAnimation} from './animation';
import {NgClass, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-animated-element',
  templateUrl: './animated-element.component.html',
  styleUrls: ['./animated-element.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    TranslateModule
  ],
  animations: [SlideInOutAnimation]
})
export class AnimatedElementComponent {
  static currentIn: AnimatedElementComponent | null = null;
  @Input() animationState = 'out';
  @Input() title!: string;
  @Input() description!: string;

  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      if (AnimatedElementComponent.currentIn === this) {
        this.animationState = 'out';
        AnimatedElementComponent.currentIn = null;
      } else {
        if (AnimatedElementComponent.currentIn) {
          AnimatedElementComponent.currentIn.animationState = 'out';
        }
        this.animationState = 'in';
        AnimatedElementComponent.currentIn = this;
      }
    }
  }
}
