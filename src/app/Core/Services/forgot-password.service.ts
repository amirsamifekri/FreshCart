import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  baseUrl = 'https://ecommerce.routemisr.com/api/v1/auth';

  constructor(private _HttpClient: HttpClient) {}

  forgotPassword(emailObj: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/forgotPasswords`, emailObj);
  }

  resetCode(resetCodeObj: object): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/verifyResetCode`,
      resetCodeObj
    );
  }

  resetPassword(resetPasswordObj: object): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}/resetPassword`,
      resetPasswordObj
    );
  }
}
