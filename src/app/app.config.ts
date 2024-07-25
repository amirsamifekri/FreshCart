import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { hangTokenInterceptor } from './Core/Interceptors/hang-token.interceptor';
import { provideToastr } from 'ngx-toastr';
import { loadingInterceptor } from './Core/Interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withInterceptors([hangTokenInterceptor, loadingInterceptor])
    ),
    provideAnimations(),
    provideToastr(),
  ],
};

// video 4 , minute 60
