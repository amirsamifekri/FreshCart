import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  baseUrl = 'https://ecommerce.routemisr.com/api/v1';
  wishlistLength = new BehaviorSubject<number>(0);

  constructor(private _HttpClient: HttpClient) {}

  getWishlistItems(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/wishlist`);
  }

  addToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/wishlist`, { productId });
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/wishlist/${productId}`);
  }
}
