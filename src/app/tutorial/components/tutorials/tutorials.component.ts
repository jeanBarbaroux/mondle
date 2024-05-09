import { Component } from '@angular/core';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
import {NgIf} from "@angular/common";
import {AnimatedElementComponent} from "../animated-element/animated-element.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    AnimatedElementComponent,
    TranslateModule,
  ],
})
export class TutorialsComponent  {
}
