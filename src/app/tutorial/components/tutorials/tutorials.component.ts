import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {AnimatedElementComponent} from "../animated-element/animated-element.component";
import {TranslateModule} from "@ngx-translate/core";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    AnimatedElementComponent,
    TranslateModule,
    AnimatedElementComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
  ],
})
export class TutorialsComponent {
  panelOpenState = false;
}
