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
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private _AuthService = inject(AuthService);
  private _Router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  message = '';
  isLoading = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
      if (localStorage.getItem('token')) this._Router.navigate(['/home']);
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w@]{6,}$/),
    ]),
  });

  // methods
  handleForm() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this._AuthService.login(this.loginForm.value).subscribe({
        next: (value) => {
          this.isLoading = false;
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', JSON.stringify(value.token));
            this._AuthService.getUserInfo(JSON.stringify(value.token));
          }
          this._Router.navigate(['/home']);
        },
        error: (error) => {
          this.isLoading = false;
          this.message = error.error.message;
        },
      });
    }
  }
}
