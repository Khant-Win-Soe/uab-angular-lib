import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'lib-input-box',
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.scss',
})
export class InputBoxComponent implements DoCheck {
  //Error Message
  @Input() validateRequiredMessage: string = 'This field can not be empty';
  @Input() validateMinLengthMessage: string =
    'This field does not meet the minimum length';
  @Input() validateMaxLengthMessage: string =
    'This field over the maximum length';
  @Input() validateEmailMessage: string = 'Please enter a valid email address';
  @Input() validatePatternMessage: string =
    'Please follow the required pattern';
  @Input() validateCustomMessage: string = 'Custom validation failed';

  //For Style
  @Input() inputBoxParentDiv: string = 'lib_input_box_parent';
  @Input() inputBoxLabelStyle: string = 'lib_input_box_label';
  @Input() inputBoxInputStyle: string = 'lib_input_box_input';
  @Input() inputBoxIconStyle: string = '';
  @Input() inputBoxErrorMessageStyle: string = 'lib_input_box_error';

  //For Value
  @Input() label: string = '';
  @Input() placeHolder: string = '';
  @Input() type: string = 'text';

  @Input() wheelPrevent: boolean = true;
  @Input() copyPastePrevent: boolean = false;
  @Input() isReadOnly: boolean = false;
  @Input() set isDisable(data: boolean) {
    if (data) this.control.disable();
  }

  @Input() set onSubmitted(data: boolean) {
    this.onSubmit = data;
    if (this.onSubmit) {
      this.control?.markAsTouched({ onlySelf: true });
    }
  }

  @Output() valueChange = new EventEmitter<string>();

  @Input() control: FormControl = new FormControl('', Validators.required);

  onSubmit: boolean | null = null;
  showValidate: boolean = false;

  get value(): string {
    return this.control.value;
  }

  set value(val: string) {
    this.control.setValue(val);
    this.valueChange.emit(val);
  }

  ngDoCheck(): void {
    this.validateShowCondition();
  }

  validateShowCondition() {
    this.showValidate =
      this.onSubmit !== false &&
      !this.isReadOnly &&
      this.control.invalid &&
      this.control.touched;
  }
  onWheel(event: WheelEvent) {
    if (this.wheelPrevent) event.preventDefault(); // Prevent the scroll wheel from changing the input value
  }
  onCopyPaste(event: ClipboardEvent) {
    if (this.copyPastePrevent) event.preventDefault(); // Disable copy, cut, and paste
  }
}
