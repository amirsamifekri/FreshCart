import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { WishlistService } from '../../Core/Services/wishlist.service';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from '../../Core/Pipes/cut-text.pipe';
import { CurrencyPipe, NgClass } from '@angular/common';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, CutTextPipe, CurrencyPipe, NgClass],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private _WishlistService = inject(WishlistService);
  private _Renderer2 = inject(Renderer2);
  private _CartService = inject(CartService);
  products: IProduct[] = [];
  idsOfProductsYouLikedThem: string | any[] = [];
  // constructor
  constructor(private toastr: ToastrService) {}

  // hooks
  ngOnInit(): void {
    this.getWishlistItems();
  }

  getWishlistItems() {
    this._WishlistService.getWishlistItems().subscribe({
      next: (value) => {
        this.products = value.data;
        this.idsOfProductsYouLikedThem = this.products.map((ele) => ele._id);
        this._WishlistService.wishlistLength.next(value.count);
      },
    });
  }
  /////
  addToCart(id: any, localRef: HTMLButtonElement) {
    this._Renderer2.setAttribute(localRef, 'disabled', 'true');
    this._CartService.addToCart(id).subscribe({
      next: (value) => {
        this.toastr.success(value.message);
        this._Renderer2.removeAttribute(localRef, 'disabled');
        this._CartService.cartItemsLength.next(value.numOfCartItems);
      },
      error: (error) => {
        this._Renderer2.removeAttribute(localRef, 'disabled');
        console.error('Error:', error);
      },
    });
  }
  //
  addToWishlist(id: string) {
    this._WishlistService.addToWishlist(id).subscribe({
      next: (value) => {
        this.toastr.success(value.message);
        this.idsOfProductsYouLikedThem = value.data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  ///
  removeFromWishlist(id: string) {
    this._WishlistService.removeFromWishlist(id).subscribe({
      next: (value) => {
        this.toastr.success(value.message);
        this.idsOfProductsYouLikedThem = value.data;
        this.products = this.products.filter((ele) =>
          this.idsOfProductsYouLikedThem.includes(ele._id!)
        );
        this._WishlistService.wishlistLength.next(this.products.length);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
