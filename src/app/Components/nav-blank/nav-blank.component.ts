import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../Core/Services/cart.service';
import { WishlistService } from '../../Core/Services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent implements OnInit {
  private _Router = inject(Router);
  private _CartService = inject(CartService);
  private _Renderer2 = inject(Renderer2);
  cartLength = 0;
  wishlistLength = 0;
  @ViewChild('navBar') navbar!: ElementRef;
  private _WishlistService = inject(WishlistService);

  // hooks
  ngOnInit(): void {
    this.getCartItems();
    this.getCartItemsLength();
    this.getWishlistItems();
    this.getWishlistLength();
  }

  // methods
  getCartItemsLength() {
    this._CartService.cartItemsLength.subscribe((value) => {
      this.cartLength = value;
    });
  }

  getCartItems() {
    this._CartService
      .getCartItems()
      .subscribe((value) => (this.cartLength = value.numOfCartItems));
  }

  signOut() {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']); // Redirect to login page after sign out
  }
  //
  getWishlistItems() {
    this._WishlistService.getWishlistItems().subscribe({
      next: (value) => {
        this.wishlistLength = value.count;
      },
    });
  }
  ///
  getWishlistLength() {
    this._WishlistService.wishlistLength.subscribe(
      (value) => (this.wishlistLength = value)
    );
  }

  // Decorators
  @HostListener('window:scroll')
  onScroll() {
    if (scrollY > 300) {
      this._Renderer2.addClass(this.navbar.nativeElement, 'px-5');
      this._Renderer2.addClass(this.navbar.nativeElement, 'shadow');
    } else {
      this._Renderer2.removeClass(this.navbar.nativeElement, 'px-5');
      this._Renderer2.removeClass(this.navbar.nativeElement, 'shadow');
    }
  }
}
