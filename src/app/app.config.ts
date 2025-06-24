import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { refreshTokenInterceptor } from './interceptors/refresh-token-interceptor';
import { httpErrorInterceptor } from './interceptors/http-error-interceptor';

import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { clientReducer } from './NgRx/Client/client.reducer';
import { ClientEffects } from './NgRx/Client/client.effects';
import { freelancerReducer } from './NgRx/Freelancer/freelancer.reducer';
import { FreelancerEffects } from './NgRx/Freelancer/freelancer.effects';
import { projectReducer } from './NgRx/Project/project.reducer';
import { ProjectEffects } from './NgRx/Project/project.effects';

import { AuthGuard } from './authguard-guard';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from './Components/toast/toastr-provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor, refreshTokenInterceptor, httpErrorInterceptor])),
    provideAnimations(),
    provideToastr(),

    provideStore(),
    provideState('client', clientReducer),
    provideEffects(ClientEffects),

    provideState('freelancer', freelancerReducer),
    provideEffects(FreelancerEffects),

    provideState('project', projectReducer),
    provideEffects(ProjectEffects),

    AuthGuard
  ]
};