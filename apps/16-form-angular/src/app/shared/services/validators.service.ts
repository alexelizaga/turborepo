import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

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

@Injectable({ providedIn: 'root' })
export class ValidatorService {
  public firstNameAndLastnamePattern: RegExp = /^([a-zA-Z]+) ([a-zA-Z]+)$/;
  public emailPattern: RegExp =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }

    return null;
  };

  public email = (control: FormControl): ValidationErrors | null => {
    return pattern(control, this.emailPattern);
  };

  public firstNameAndLastname = (
    control: FormControl
  ): ValidationErrors | null => {
    return pattern(control, this.firstNameAndLastnamePattern);
  };

  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }
}
