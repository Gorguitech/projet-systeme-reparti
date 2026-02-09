import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-moto-dark-900 border-b border-moto-dark-800">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="mr-3 p-2 rounded-lg bg-gradient-to-br from-moto-primary-600 to-moto-primary-800">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-heading font-bold text-white">
                <a routerLink="/" class="hover:text-moto-primary-400 transition-colors">
                  MotoMarket
                </a>
              </h1>
              <p class="text-xs text-moto-dark-400">Consultation de motos d'occasion</p>
            </div>
          </div>

          <!-- Navigation simplifiée -->
          <nav class="flex items-center space-x-6">
            <a routerLink="/motos" 
               routerLinkActive="text-moto-primary-400"
               [routerLinkActiveOptions]="{exact: true}"
               class="text-moto-dark-300 hover:text-white transition-colors font-medium">
              Catalogue
            </a>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent {}