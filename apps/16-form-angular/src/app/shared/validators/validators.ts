import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

export const firstNameAndLastnamePattern: RegExp = /^([a-zA-Z]+) ([a-zA-Z]+)$/;
export const emailPattern: RegExp =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const pattern = (
  control: FormControl,
  pattern: RegExp
): ValidationErrors | null => {
  const value: string = control.value.trim();

  if (!pattern.test(value)) {
    return {
      requiredPattern: `${pattern}`,
    };
  }

  return null;
};

export class MyValidators {
  constructor() {}

  static cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }

    return null;
  };

  static email = (control: FormControl): ValidationErrors | null => {
    return pattern(control, emailPattern);
  };

  static firstNameAndLastname = (
    control: FormControl
  ): ValidationErrors | null => {
    return pattern(control, firstNameAndLastnamePattern);
  };

  static isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }
}
