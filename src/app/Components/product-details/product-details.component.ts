import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Core/Services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { IProductDetails } from '../../Core/Interfaces/iproduct-details';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../Core/Services/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgFor, CarouselModule, CurrencyPipe, NgClass],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  private _ActivatedRoute = inject(ActivatedRoute);
  private _ProductsService = inject(ProductsService);
  private _CartService = inject(CartService);
  private _Renderer2 = inject(Renderer2); // to manipulate the DOM
  // constructor
  constructor(private toastr: ToastrService) {}
  productId = '';
  productDetails!: IProductDetails;
  private _WishlistService = inject(WishlistService);
  idsOfProductsYouLikedThem: string | any[] = [];

  ngOnInit(): void {
    this.getProductId();
  }

  getProductId() {
    this._ActivatedRoute.params.subscribe(({ productId }) => {
      this.productId = productId;

      this.getProductDetails();
    });
  }
  //
  getProductDetails() {
    this._ProductsService.getProductById(this.productId).subscribe({
      next: (value) => {
        this.productDetails = value.data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  ////////
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
  ////
  addToWishlist(id: string) {
    this._WishlistService.addToWishlist(id).subscribe({
      next: (value) => {
        this.toastr.success(value.message);
        this.idsOfProductsYouLikedThem = value.data;
        this._WishlistService.wishlistLength.next(
          this.idsOfProductsYouLikedThem.length
        );
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  // carousel options
  productDetailsSlidersOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed: 1000,
    dots: true,
    items: 1,
    navSpeed: 700,
    navText: ['', ''],
    // responsive: {
    //   0: {
    //     items: 2,
    //   },
    //   400: {
    //     items: 3,
    //   },
    //   740: {
    //     items: 4,
    //   },
    //   940: {
    //     items: 6,
    //   },
    // },
    nav: false,
  };
}
