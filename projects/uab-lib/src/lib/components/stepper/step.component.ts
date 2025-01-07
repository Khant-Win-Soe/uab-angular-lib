import { Component, Input } from '@angular/core';

@Component({
  selector: 'uab-step',
  standalone: false,
  template: `
    <div *ngIf="isActive">
      <ng-content>ddd</ng-content>
    </div>
  `,
  styles: [],
})
export class StepComponent {
  @Input() isActive = false;
  @Input() label: string = '';
  @Input() icon: string = '';
}
