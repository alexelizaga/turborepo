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

  static isFieldOneEqualToFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }
}
