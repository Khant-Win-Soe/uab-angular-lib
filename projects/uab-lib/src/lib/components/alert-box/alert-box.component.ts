import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

export type AlertType = 'success' | 'info' | 'warning' | 'danger' | 'default';

export const AlertTypeConst: { [key in AlertType]: AlertType } = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  danger: 'danger',
  default: 'default',
};

@Component({
  selector: 'uab-alert-box',
  standalone: false,
  templateUrl: './alert-box.component.html',
  styleUrl: './alert-box.component.scss',
})
export class AlertBoxComponent implements OnInit, DoCheck {
  @Input() alertType: AlertType = AlertTypeConst.info;
  @Input() alertIconClass: string = 'fa-solid fa-circle-exclamation';
  @Input() alertTitle: string = 'No Results Found.';
  @Input() alertText: string =
    'There is no registered pensioner with that NRC number.';
  @Input() alertButtonText: string = 'Ok';
  @Input() alertOn: boolean = false;
  @Output() alertOnChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() alertWidth: string = '';
  @Input() alertMaxWidth: string = '';
  @Input() alertMinWidth: string = '';
  @Input() alertHeight: string = '';
  @Input() alertMaxHeight: string = '';
  @Input() alertMinHeight: string = '';

  currentStyles: Record<string, string> = {};
  alertColor: string = '';
  alertStyle: string = '';

  ngOnInit(): void {
    this.setCurrentStyles();
  }
  ngDoCheck(): void {
    this.filterAlertType(this.alertType);
  }
  filterAlertType(data: string) {
    switch (data) {
      case AlertTypeConst.success:
        this.alertIconClass = 'fa-solid fa-circle-check';
        this.alertTitle = 'Success';
        this.alertColor = 'success';
        break;
      case AlertTypeConst.info:
        this.alertIconClass = 'fa-solid fa-circle-info';
        this.alertTitle = 'Information';
        this.alertColor = 'info';
        break;
      case AlertTypeConst.warning:
        this.alertIconClass = 'fa-solid fa-triangle-exclamation';
        this.alertTitle = 'Warning';
        this.alertColor = 'warning';
        break;
      case AlertTypeConst.danger:
        this.alertIconClass = 'fa-solid fa-circle-exclamation';
        this.alertTitle = 'Error';
        this.alertColor = 'danger';
        break;
      default:
        this.alertStyle = 'alert_icon_left';
        break;
    }
  }

  setCurrentStyles() {
    this.currentStyles = {
      width: this.alertWidth ? this.alertWidth : 'auto',
      'max-width': this.alertMaxWidth ? this.alertMaxWidth : '',
      'min-width': this.alertMinWidth ? this.alertMinWidth : '',
      height: this.alertHeight ? this.alertHeight : 'auto',
      'max-height': this.alertMaxHeight ? this.alertMaxHeight : '',
      'min-height': this.alertMinHeight ? this.alertMinHeight : '',
      // padding: this.buttonPadding ? this.buttonPadding : '8px',
    };
  }

  closeAlert() {
    this.alertOn = false;
    this.alertOnChange.emit(this.alertOn);
  }
}
