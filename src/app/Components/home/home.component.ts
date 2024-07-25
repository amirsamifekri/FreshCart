import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { CurrencyPipe, NgClass, NgFor, SlicePipe } from '@angular/common';
import { CutTextPipe } from '../../Core/Pipes/cut-text.pipe';
import { ICategory } from '../../Core/Interfaces/icategory';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Core/Services/cart.service';

import { provideToastr, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchProductsPipe } from '../../Core/Pipes/search-products.pipe';
import { WishlistService } from '../../Core/Services/wishlist.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SlicePipe,
    CutTextPipe,
    CurrencyPipe,
    CarouselModule,
    NgFor,
    RouterLink,
    FormsModule,
    SearchProductsPipe,
    NgClass,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private _ProductsService = inject(ProductsService);
  private _CartService = inject(CartService);
  private _WishlistService = inject(WishlistService);
  private _Renderer2 = inject(Renderer2); // to manipulate the DOM
  products: IProduct[] = [];
  categories: ICategory[] = [];
  searchText = '';
  idsOfProductsYouLikedThem: string | any[] = [];
  // constructor
  constructor(private toastr: ToastrService) {}
  // hooks
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.getWishlistItems();
  }

  // methods

  getAllProducts() {
    this._ProductsService.getProducts().subscribe({
      next: (value) => {
        this.products = value.data;
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  ///
  getAllCategories() {
    this._ProductsService.getCategories().subscribe({
      next: (value) => {
        this.categories = value.data;
      },
      error: (error) => {
        console.error('Error:', error);
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
        this._WishlistService.wishlistLength.next(
          this.idsOfProductsYouLikedThem.length
        );
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  /////
  getWishlistItems() {
    this._WishlistService.getWishlistItems().subscribe({
      next: (value) => {
        this.idsOfProductsYouLikedThem = value.data.map((ele: any) => ele._id);
        this._WishlistService.wishlistLength.next(value.count);
      },
    });
  }

  // carousel options
  categoriesSlidersOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed: 1000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };
  //////
  mainSlidersOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
}
