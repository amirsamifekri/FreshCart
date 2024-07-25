import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const hangTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('token')) {
      const token = {
        token: JSON.parse(localStorage.getItem('token')!),
      };
      req = req.clone({
        setHeaders: token,
      });
    }
  }
  return next(req);
};
