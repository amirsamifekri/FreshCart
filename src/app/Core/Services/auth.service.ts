import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://ecommerce.routemisr.com/api/v1/auth';
  userInfo: any = '';

  getUserInfo(token: string) {
    if (token) {
      const decodedData = jwtDecode(token);
      this.userInfo = decodedData;
    }
  }

  constructor(private _HttpClient: HttpClient) {}

  register(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/signup`, userData);
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/signin`, userData);
  }
}
