import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../../Core/Services/cart.service';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { CutTextPipe } from '../../Core/Pipes/cut-text.pipe';
import { CurrencyPipe } from '@angular/common';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CutTextPipe, CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private _CartService = inject(CartService);
  private _Renderer2 = inject(Renderer2);
  cartDetails: any;

  // constructor
  constructor(private toastr: ToastrService) {}

  // hooks
  ngOnInit(): void {
    this.getCartItems();
  }

  // methods
  getCartItems() {
    this._CartService.getCartItems().subscribe({
      next: (value) => {
        this.cartDetails = value.data;
      },
      error: (error) => console.error(error),
    });
  }
  ////
  removeItem(id: string, localRef: HTMLButtonElement) {
    this._Renderer2.setAttribute(localRef, 'disabled', 'true');
    this._CartService.removeItemFromCart(id).subscribe({
      next: (value) => {
        this.cartDetails = value.data;
        this._Renderer2.removeAttribute(localRef, 'disabled');
        this._CartService.cartItemsLength.next(value.numOfCartItems);
      },
      error: (error) => {
        this._Renderer2.removeAttribute(localRef, 'disabled');
      },
    });
  }
  ///////////
  updateCount(
    newCount: number,
    id: string,
    localRef1: HTMLButtonElement,
    localRef2: HTMLButtonElement
  ) {
    if (newCount) {
      this._Renderer2.setAttribute(localRef1, 'disabled', 'true');
      this._Renderer2.setAttribute(localRef2, 'disabled', 'true');
      this._CartService.updateProductCount(newCount, id).subscribe({
        next: (value) => {
          this.cartDetails = value.data;
          this._Renderer2.removeAttribute(localRef1, 'disabled');
          this._Renderer2.removeAttribute(localRef2, 'disabled');
        },
        error: (error) => {
          console.error(error);
          this._Renderer2.removeAttribute(localRef1, 'disabled');
          this._Renderer2.removeAttribute(localRef2, 'disabled');
        },
      });
    } else {
      this.toastr.warning('The minimum number is 1');
    }
  }
  ////
  deleteCart() {
    this._CartService.deleteCart().subscribe({
      next: (value) => {
        this.cartDetails = null;
        this._CartService.cartItemsLength.next(0);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
