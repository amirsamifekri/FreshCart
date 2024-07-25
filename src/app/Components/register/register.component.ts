import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  private _AuthService = inject(AuthService);
  private _Router = inject(Router);
  message = '';
  isLoading = false;
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
      if (localStorage.getItem('token')) this._Router.navigate(['/home']);
  }

  registerForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w@]{6,}$/),
      ]),
      rePassword: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(02)?01[0125]\d{8}$/),
      ]),
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );

  confirmPassword(form: FormGroup) {
    const password = form.get('password'),
      rePassword = form.get('rePassword');
    // required
    if (rePassword?.value === '') rePassword.setErrors({ required: true });
    // mismatch
    else if (password?.value !== rePassword?.value)
      rePassword?.setErrors({ mismatch: true });
  }

  // methods
  handleForm() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (value) => {
          this.isLoading = false;
          this._Router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.message = error.error.message;
        },
      });
    }
  }
}
