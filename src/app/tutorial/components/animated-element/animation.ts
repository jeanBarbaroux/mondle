import {animate, group, state, style, transition, trigger} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state('in', style({
      'max-height': '1000px', 'opacity': '1', 'visibility': 'visible'
    })),
    state('out', style({
      'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
    })),
    transition('in => out', [group([
        animate('200ms ease-in-out', style({
          'opacity': '0'
        })),
        animate('300ms ease-in-out', style({
          'max-height': '0px'
        })),
        animate('350ms ease-in-out', style({
          'visibility': 'hidden'
        }))
      ]
    )]),
    transition('out => in', [group([
        animate('1ms ease-in-out', style({
          'visibility': 'visible'
        })),
        animate('50ms ease-in-out', style({
          'max-height': '20000px',
          'overflow-y': 'auto'
        })),
        animate('350ms ease-in-out', style({
          'opacity': '1'
        }))
      ]
    )])
  ]),
]
