import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = 'https://ecommerce.routemisr.com/api/v1';

  constructor(private _HttpClient: HttpClient) {}

  getProducts(page = 1): Observable<any> {
    // return this._HttpClient.get(`${this.baseUrl}/products`, {
    //   params: { page },
    // });

    return this._HttpClient.get(`${this.baseUrl}/products?page=${page}`);
  }

  getProductById(productId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/products/${productId}`);
  }

  getCategories(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/categories`);
  }
}
