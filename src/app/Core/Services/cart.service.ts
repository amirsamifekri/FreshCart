import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Behavior Subjects
  cartItemsLength = new BehaviorSubject<number>(0);
  // properties
  baseUrl = 'https://ecommerce.routemisr.com/api/v1';

  // constructor
  constructor(private _HttpClient: HttpClient) {}

  // methods
  addToCart(id: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/cart`, { productId: id });
  }
  getCartItems(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/cart`);
  }
  removeItemFromCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/cart/${id}`);
  }
  updateProductCount(newCount: number, id: string): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/cart/${id}`, {
      count: newCount,
    });
  }
  deleteCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/cart`);
  }

  checkOut(id: string, obj: object): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/orders/checkout-session/${id}?url=https://localhost:4200`,
      { shippingAddress: obj }
    );
  }
}
