import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'my-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent {
  form: FormGroup;
  hide = true;

  type: 'login' | 'signup' | 'reset' = 'login';
  loading = false;

  serverMessage = '';

  constructor(
    public dialogRef: MatDialogRef<EmailLoginComponent>,
    public authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.minLength(6), Validators.required]
      ],
      passwordConfirm: ['', []]
    });
  }

  changeType(val: 'login' | 'signup' | 'reset'): void {
    this.type = val;
  }

  get isLogin(): boolean {
    return this.type === 'login';
  }

  get isSignup(): boolean {
    return this.type === 'signup';
  }

  get isPasswordReset(): boolean {
    return this.type === 'reset';
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }
  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  get passwordConfirm(): AbstractControl | null {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch(): boolean {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password?.value === this.passwordConfirm?.value;
    }
  }

  async onSubmit(): Promise<void> {
    this.loading = true;

    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        await this.authService.login(email, password);
      }
      if (this.isSignup) {
        await this.authService.signup(email, password);
      }
      if (this.isPasswordReset) {
        await this.authService.passwordreset(email);
        this.serverMessage = 'Check your email';
      }
    } catch (err) {
      this.serverMessage = err;
    }

    this.loading = false;
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
