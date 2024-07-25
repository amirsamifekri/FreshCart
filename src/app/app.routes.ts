import { Routes } from '@angular/router';
import { authGuard } from './Core/Guards/auth.guard';

export const routes: Routes = [
  // blank layout
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./Layouts/blank-layout/blank-layout.component').then(
        (c) => c.BlankLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./Components/home/home.component').then(
            (c) => c.HomeComponent
          ),
        title: 'Home',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./Components/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./Components/cart/cart.component').then(
            (c) => c.CartComponent
          ),
        title: 'Cart',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./Components/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'product-details/:productId',
        loadComponent: () =>
          import('./Components/product-details/product-details.component').then(
            (c) => c.ProductDetailsComponent
          ),
        title: 'Product Details',
      },
      {
        path: 'Wishlist',
        loadComponent: () =>
          import('./Components/wishlist/wishlist.component').then(
            (c) => c.WishlistComponent
          ),
        title: 'Wishlist',
      },
      {
        path: 'payment/:cartId',
        loadComponent: () =>
          import('./Components/payment/payment.component').then(
            (c) => c.PaymentComponent
          ),
        title: 'Payment',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./Components/allorders/allorders.component').then(
            (c) => c.AllordersComponent
          ),
        title: 'All Orders',
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./Components/forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent
          ),
        title: 'Forgot Password',
      },
    ],
  },
  // auth layout
  {
    path: '',
    loadComponent: () =>
      import('./Layouts/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./Components/login/login.component').then(
            (c) => c.LoginComponent
          ),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./Components/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'forgot-password-auth',
        loadComponent: () =>
          import('./Components/forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent
          ),
        title: 'Forgot Password',
      },
    ],
  },
  // wild card
  {
    path: '**',
    loadComponent: () =>
      import('./Components/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
    title: 'Not Found Page',
  },
];
