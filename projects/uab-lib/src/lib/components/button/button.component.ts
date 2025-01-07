import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type ButtonColorType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'link'
  | 'noBackground';

export type ButtonRadiusType =
  | 'small'
  | 'normal'
  | 'large'
  | 'rounded'
  | 'circle';

export const ButtonColorStyles: { [key in ButtonColorType]: ButtonColorType } =
  {
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
    link: 'link',
    noBackground: 'noBackground',
  };

export const ButtonRadiusStyles: {
  [key in ButtonRadiusType]: ButtonRadiusType;
} = {
  small: 'small',
  normal: 'normal',
  large: 'large',
  rounded: 'rounded',
  circle: 'circle',
};

@Component({
  selector: 'lib-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {
  @Input() buttonText: string = '';
  @Input() buttonWidth: string = '';
  @Input() buttonHeight: string = '';
  @Input() buttonPadding: string = '';
  @Input() customClass: string = '';
  @Input() buttonIconClass: string = '';
  @Input() buttonColor: ButtonColorType = ButtonColorStyles.primary;
  @Input() buttonRadius: ButtonRadiusType = ButtonRadiusStyles.normal;

  @Output() buttonClick = new EventEmitter<void>();
  @Output() mouseDown = new EventEmitter<void>();
  @Output() mouseUp = new EventEmitter<void>();
  @Output() mouseLeave = new EventEmitter<void>();

  currentStyles: Record<string, string> = {};

  ngOnInit(): void {
    this.setCurrentStyles();
  }

  setCurrentStyles() {
    this.currentStyles = {
      width: this.buttonWidth ? this.buttonWidth : '100%',
      height: this.buttonHeight ? this.buttonHeight : '100%',
      padding: this.buttonPadding ? this.buttonPadding : '8px',
    };
  }

  click() {
    this.buttonClick.emit();
  }
  mDown() {
    this.mouseDown.emit();
  }
  mUp() {
    this.mouseUp.emit();
  }
  mLeave() {
    this.mouseLeave.emit();
  }
}
