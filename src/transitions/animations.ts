import { animate, style, transition, trigger, query } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'scale(0.5) rotate(-10deg)' })
    ], { optional: true }),
    query(':leave', [
      style({ opacity: 1, transform: 'scale(1)' }),
      animate('600ms ease-in-out', style({ opacity: 0, transform: 'scale(1.5) rotate(10deg)' }))
    ], { optional: true }),
    query(':enter', [
      animate('600ms ease-in-out', style({ opacity: 1, transform: 'scale(1) rotate(0deg)' }))
    ], { optional: true })
  ])
]);
