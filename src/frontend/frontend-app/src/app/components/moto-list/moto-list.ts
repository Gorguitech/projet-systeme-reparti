import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, Moto } from '../../services/api.service';

@Component({
  selector: 'app-moto-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="animate-fade-in">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-4xl font-heading font-bold text-white mb-2">
          Catalogue de Motos ({{motos.length}})
        </h1>
        <p class="text-moto-dark-300">
          Découvrez notre sélection de motos d'occasion
        </p>
      </div>

      <!-- Filtres -->
      <div class="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-moto-dark-800 rounded-lg">
        <div class="flex space-x-2">
          <button (click)="setFilter('all')" [class]="getFilterClass('all')">
            Toutes
          </button>
          <button (click)="setFilter('disponible')" [class]="getFilterClass('disponible')">
            Disponibles
          </button>
          <button (click)="setFilter('vendue')" [class]="getFilterClass('vendue')">
            Vendues
          </button>
        </div>

        <select [(ngModel)]="selectedMarque" (change)="applyFilters()"
                class="bg-moto-dark-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-moto-primary-500">
          <option value="">Toutes marques</option>
          <option *ngFor="let marque of marques" [value]="marque">{{ marque }}</option>
        </select>
      </div>

      <!-- Grille de motos -->
      <div *ngIf="filteredMotos.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let moto of filteredMotos" 
             class="bg-moto-dark-800 rounded-lg overflow-hidden card-shadow hover:shadow-xl transition-all duration-300">
          
          <!-- Image -->
          <div class="h-48 bg-moto-dark-700 overflow-hidden relative">
            <img [src]="moto.image_url || defaultImage" 
                 [alt]="moto.marque + ' ' + moto.modele"
                 class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                 (error)="moto.image_url = defaultImage" />
            
            <!-- Badge statut -->
            <span [class]="moto.vendu ? 'bg-moto-danger-600' : 'bg-moto-success-600'"
                  class="absolute top-4 right-4 badge text-white">
              {{ moto.vendu ? 'Vendue' : 'Disponible' }}
            </span>
          </div>

          <!-- Contenu -->
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold text-white">
                {{ moto.marque }} {{ moto.modele }}
              </h3>
              <span class="text-xl font-bold text-moto-primary-400">
                {{ moto.prix | number:'1.0-0' }} €
              </span>
            </div>
            
            <p class="text-moto-dark-400 text-sm mb-4">
              {{ moto.annee }} • {{ moto.kilometrage | number }} km • {{ moto.couleur }}
            </p>

            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  [ngClass]="getTypeColor(moto.type_moto)">
              {{ getTypeLabel(moto.type_moto) }}
            </span>

            <p class="text-moto-dark-300 text-sm line-clamp-2 mb-4">
              {{ moto.description || 'Pas de description' }}
            </p>

            <a [routerLink]="['/motos', moto.id]" 
               class="block w-full text-center bg-moto-dark-700 hover:bg-moto-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
              Voir détails
            </a>
          </div>
        </div>
      </div>

      <!-- Aucun résultat -->
      <div *ngIf="filteredMotos.length === 0" class="text-center py-12">
        <p class="text-moto-dark-400 text-lg">Aucune moto ne correspond à vos critères</p>
        <button (click)="resetFilters()" class="mt-4 btn-gradient text-white py-2 px-6 rounded-lg">
          Réinitialiser
        </button>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class MotoListComponent {
  motos: Moto[] = [];
  filteredMotos: Moto[] = [];
  marques: string[] = [];
  selectedMarque = '';
  currentFilter = 'all';
  defaultImage = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.loadMotos();
  }

  loadMotos(): void {
    this.api.getMotos().subscribe({
      next: (response: any) => {
        this.motos = response.results || [];
        this.filteredMotos = [...this.motos];
        this.extractMarques();
        console.log('Motos chargées:', this.motos);
        
        // FORCER LA MISE À JOUR
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.motos = [];
        this.filteredMotos = [];
        this.cdr.detectChanges();
      }
    });
  }

  extractMarques(): void {
    this.marques = [...new Set(this.motos.map(m => m.marque))].sort();
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
    this.applyFilters();
    this.cdr.detectChanges();
  }

  applyFilters(): void {
    let result = [...this.motos];

    if (this.currentFilter === 'disponible') {
      result = result.filter(m => !m.vendu);
    } else if (this.currentFilter === 'vendue') {
      result = result.filter(m => m.vendu);
    }

    if (this.selectedMarque) {
      result = result.filter(m => m.marque === this.selectedMarque);
    }

    this.filteredMotos = result;
    this.cdr.detectChanges();
  }

  resetFilters(): void {
    this.selectedMarque = '';
    this.currentFilter = 'all';
    this.filteredMotos = [...this.motos];
    this.cdr.detectChanges();
  }

  getFilterClass(filter: string): string {
    const base = 'px-4 py-2 rounded-lg font-semibold transition-all';
    return this.currentFilter === filter
      ? `${base} bg-moto-primary-600 text-white`
      : `${base} bg-moto-dark-700 text-moto-dark-300 hover:bg-moto-dark-600`;
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'SPORT': 'Sportive',
      'ROADSTER': 'Roadster',
      'CUSTOM': 'Custom',
      'ENDURO': 'Enduro',
      'SCOOTER': 'Scooter',
      'GT': 'Grand Tourisme'
    };
    return labels[type] || type;
  }

  getTypeColor(type: string): string {
    const colors: Record<string, string> = {
      'SPORT': 'bg-moto-primary-900 text-moto-primary-300',
      'ROADSTER': 'bg-moto-accent-900 text-moto-accent-300',
      'CUSTOM': 'bg-moto-success-900 text-moto-success-300',
      'ENDURO': 'bg-purple-900 text-purple-300',
      'SCOOTER': 'bg-blue-900 text-blue-300',
      'GT': 'bg-yellow-900 text-yellow-300'
    };
    return colors[type] || 'bg-moto-dark-700 text-moto-dark-300';
  }
}