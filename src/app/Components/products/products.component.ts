import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { CartService } from '../../Core/Services/cart.service';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from '../../Core/Pipes/cut-text.pipe';
import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { WishlistService } from '../../Core/Services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    CutTextPipe,
    CurrencyPipe,
    NgxPaginationModule,
    NgFor,
    NgClass,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private _ProductsService = inject(ProductsService);
  private _CartService = inject(CartService);
  private _Renderer2 = inject(Renderer2); // to manipulate the DOM
  products: IProduct[] = [];

  // pagination properties
  itemsPerPage: any;
  currentPage: any;
  totalItems: any;
  private _WishlistService = inject(WishlistService);
  idsOfProductsYouLikedThem: string | any[] = [];

  // constructor
  constructor(private toastr: ToastrService) {}
  // hooks
  ngOnInit(): void {
    this.getAllProducts(this.currentPage);
    this.getWishlistItems();
  }

  // methods

  getAllProducts(page: number) {
    this._ProductsService.getProducts(page).subscribe({
      next: (value) => {
        this.itemsPerPage = value.metadata.limit;
        this.currentPage = value.metadata.currentPage;
        this.totalItems = value.results;
        this.products = value.data;
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
  ///
  pageChanged(event: any) {
    console.log(event);
    scroll(0, 0);
    this.getAllProducts(event);
  }
  ///
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
}
