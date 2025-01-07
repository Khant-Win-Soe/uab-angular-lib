import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { nrcData } from '../../json/nrc.json';

// interface NRCDataModel {
//   types: CitizenShipListModel;
//   states: StateListModel
// }
interface CitizenShipListModel {
  id: number;
  code: string;
  code_mm: string;
  name: string;
  name_mm: string;
}
interface StateListModel {
  id: number;
  code: number;
  code_mm: string;
  name: string;
  name_mm: string;
  townships: TownshopListModel[];
}
interface TownshopListModel {
  id: number;
  code: string;
  code_mm: string;
  name: string;
  name_mm: string;
}
@Component({
  standalone: false,
  selector: 'lib-nrc-box',
  templateUrl: './nrc-box.component.html',
  styleUrl: './nrc-box.component.scss',
})
export class NrcBoxComponent implements OnInit, DoCheck {
  @Input() label: string = '';
  @Input() set value(data: string) {
    this.conditionCheckFunction(data);
  }
  @Input() showRadio: boolean = false;
  @Input() disable: boolean = false;
  @Input() isRequired: boolean = false;
  @Output() valueChanges: EventEmitter<string> = new EventEmitter<string>();

  isNrc: boolean = true;
  stateCode: number = 0;
  townshipCode: string = '';
  citizenShip: string = '';
  nrcNumber: number | string = 0;

  // stateList: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  // townshipList: string[] = ['DaGaNa', 'AhPhNa', 'UKaMa', '...'];
  // citizenList: string[] = ['N', 'P', 'E'];
  nrcRadio: { dispaly: string; value: boolean }[] = [
    { dispaly: 'မှတ်ပုံတင်အသစ်', value: true },
    { dispaly: 'မှတ်ပုံတင်အဟောင်း', value: false },
  ];

  conditionCheckFunction(data: string) {
    this.isNrc = data.includes('/') && data.includes('(') && data.includes(')');
    if (this.isNrc) {
      const regex =
        /^(\d+|[\u1000-\u103F]+)\/([A-Za-z\u1000-\u103F]+)\((\w+)\)(\d+)$/;
      const matches = data.match(regex);
      if (matches) {
        this.stateCode = Number(matches[1]);
        this.townshipCode = matches[2];
        this.citizenShip = matches[3];
        this.nrcNumber = Number(matches[4]);
      }
    } else {
      this.nrcNumber = data;
    }
  }
  // data!: NRCDataModel;

  stateList!: StateListModel[];
  townshipList!: TownshopListModel[];
  citizenList!: CitizenShipListModel[];

  ngOnInit(): void {
    this.citizenList = nrcData.types;
    this.stateList = nrcData.states;
  }
  stateCodeChange(value: any) {
    const aa = this.stateList.find((item) => item.code_mm === value);
    this.townshipList = aa?.townships || [];
    this.townshipCode = '';
  }
  ngDoCheck(): void {
    const nrcData =
      (this.stateCode !== null &&
      this.stateCode !== undefined &&
      this.stateCode !== 0
        ? String(this.stateCode) + '/'
        : '') +
      (this.townshipCode !== null && this.townshipCode !== undefined
        ? this.townshipCode
        : '') +
      (this.citizenShip !== null && this.citizenShip !== undefined
        ? '(' + this.citizenShip + ')'
        : '') +
      this.nrcNumber;
    this.valueChanges.emit(nrcData);
  }
}
