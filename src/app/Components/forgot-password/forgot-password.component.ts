import { Component, inject, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForgotPasswordService } from '../../Core/Services/forgot-password.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  message = '';
  step1 = true;
  step2 = false;
  step3 = false;
  email = '';
  private _ForgotPasswordService = inject(ForgotPasswordService);
  private _Router = inject(Router);

  private platformId = inject(PLATFORM_ID);

  ////////////////
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  //
  resetCodeForm = new FormGroup({
    resetCode: new FormControl('', Validators.required),
  });
  ////
  resetPasswordForm = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]{6,}$/),
    ]),
  });

  // forms methods
  handleEmailForm() {
    if (this.emailForm.valid) {
      this.email = this.emailForm.value.email!;
      this._ForgotPasswordService
        .forgotPassword(this.emailForm.value)
        .subscribe({
          next: (value) => {
            this.step1 = false;
            this.step2 = true;
          },
          error: (error) => (this.message = ' error.error.message'),
        });
    }
  }
  ///
  handleResetCodeForm() {
    if (this.resetCodeForm.valid) {
      this._ForgotPasswordService
        .resetCode(this.resetCodeForm.value)
        .subscribe({
          next: (value) => {
            this.step2 = false;
            this.step3 = true;
            this.message = value.status;
          },
          error: (error) => (this.message = error.error.message),
        });
    }
  }
  /////
  handleResetPasswordForm() {
    if (this.resetPasswordForm.valid) {
      this._ForgotPasswordService
        .resetPassword({
          email: this.email,
          newPassword: this.resetPasswordForm.value.newPassword,
        })
        .subscribe({
          next: (value) => {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('token', JSON.stringify(value.token));
              console.log(value);
            }
            this._Router.navigate(['/home']);
          },
          error: (error) => (this.message = error.error.message),
        });
    }
  }
}
