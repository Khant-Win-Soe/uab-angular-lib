import { Component, Input } from '@angular/core';

@Component({
  selector: 'uab-step',
  standalone: false,
  template: `
    <div *ngIf="isActive">
      <ng-content>R</ng-content>
    </div>
  `,
  styles: [],
})
export class StepComponent {
  @Input() isActive = false;
  @Input() label: string = '';
  @Input() icon: string = '';
}
