import { Component, EventEmitter, Input, Output } from '@angular/core';

export class DropDownDataModel {}

@Component({
  selector: 'lib-dropdown-box',
  standalone: false,

  templateUrl: './dropdown-box.component.html',
  styleUrl: './dropdown-box.component.scss',
})
export class DropdownBoxComponent {
  //For Style
  @Input() dropDownParentDiv: string = 'lib_dropdown_box_parent';
  @Input() dropDownLabelStyle: string = 'lib_dropdown_box_label';
  @Input() dropDownInputStyle: string = 'lib_dropdown_box_input';
  @Input() dropDownIconStyle: string = '';
  @Input() dropDownErrorMessageStyle: string = 'lib_dropdown_box_error';

  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() isDisabled: boolean = false;
  @Input() value: any = '';
  @Input() valueExp: any = '';
  @Input() displayValue: any = '';
  @Input() dataSource: any[] = [];

  @Output() selectionChange = new EventEmitter<any>();

  selectedItem: string | null = null;
  showDropdownList = false;

  showDropdownLists() {
    this.showDropdownList = true;
  }

  onSelect(item: string): void {
    this.selectedItem = item;
    this.selectionChange.emit(item);
    this.showDropdownList = false;
  }
}
