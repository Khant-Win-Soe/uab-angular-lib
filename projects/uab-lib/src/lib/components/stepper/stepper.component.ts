import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { StepComponent } from './step.component';

@Component({
  selector: 'uab-stepper',
  standalone: false,
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent implements AfterContentInit {
  @ContentChildren(StepComponent) steps!: QueryList<StepComponent>;
  currentStepIndex = 0;

  ngAfterContentInit() {
    this.updateSteps();
  }

  next() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.updateSteps();
    }
  }

  prev() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.updateSteps();
    }
  }

  private updateSteps() {
    this.steps.forEach((step, index) => {
      step.isActive = index === this.currentStepIndex;
    });
  }
}
