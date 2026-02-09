import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

export const routes = [
  { path: '', loadComponent: () => import('./components/moto-list/moto-list').then(m => m.MotoListComponent) },
  { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()]
};