import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function gte(control: AbstractControl): ValidationErrors | null {
  const v: number = +control.value;
  if (isNaN(v)) {
    return { gte: true, requiredValue: 10 };
  }
  if (v <= 10) {
    return { gte: true, requiredValue: 10 };
  }
  return null;
}
//usage
//   myForm = new FormGroup({    numVal: new FormControl('', [gte]),  })

//pass with parameter
export function gtec(val: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let v: number = +control.value;
    if (isNaN(v)) {
      return { gtec: true, requiredValue: val };
    }
    if (v <= +val) {
      return { gtec: true, requiredValue: val };
    }

    return null;
  };
}

//usage
//   myForm = new FormGroup({    numVal: new FormControl('', [gtec(10)]),  })
