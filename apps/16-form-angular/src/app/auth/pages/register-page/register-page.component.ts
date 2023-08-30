import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MyValidators } from '../../../shared/validators/validators';
import { EmailValidator } from '../../../shared/validators/email.validator';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  public myForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, MyValidators.firstNameAndLastname]],
      email: [
        '',
        [Validators.required, MyValidators.email],
        [new EmailValidator()],
      ],
      username: ['', [Validators.required, MyValidators.cantBeStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        MyValidators.isFieldOneEqualToFieldTwo('password', 'password2'),
      ],
    }
  );

  constructor(private fb: FormBuilder) {}

  isValidField(field: string): boolean | null {
    return MyValidators.isValidField(this.myForm, field);
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }
}
