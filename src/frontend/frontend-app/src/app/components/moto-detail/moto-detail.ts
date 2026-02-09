import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService, Moto } from '../../services/api.service';

@Component({
  selector: 'app-moto-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-4xl mx-auto animate-fade-in">
      <button routerLink="/motos" 
              class="inline-flex items-center text-moto-primary-400 hover:text-moto-primary-300 mb-6">
        ← Retour au catalogue
      </button>

      <div *ngIf="moto" class="bg-moto-dark-800 rounded-lg overflow-hidden card-shadow">
        <div class="h-64 md:h-96 bg-moto-dark-700 overflow-hidden relative">
          <img [src]="moto.image_url || defaultImage" 
               class="w-full h-full object-cover" />
          <span [class]="moto.vendu ? 'bg-moto-danger-600' : 'bg-moto-success-600'"
                class="absolute top-4 right-4 badge text-white text-lg">
            {{ moto.vendu ? 'Vendue' : 'Disponible' }}
          </span>
        </div>

        <div class="p-6 md:p-8">
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
            {{ moto.marque }} {{ moto.modele }}
          </h1>
          <p class="text-3xl font-bold text-moto-primary-400 mb-4">
            {{ moto.prix | number:'1.0-0' }} €
          </p>
          
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-moto-dark-900 p-4 rounded-lg">
              <p class="text-moto-dark-400 text-sm">Année</p>
              <p class="font-semibold text-white">{{ moto.annee }}</p>
            </div>
            <div class="bg-moto-dark-900 p-4 rounded-lg">
              <p class="text-moto-dark-400 text-sm">Kilométrage</p>
              <p class="font-semibold text-white">{{ moto.kilometrage | number }} km</p>
            </div>
            <div class="bg-moto-dark-900 p-4 rounded-lg">
              <p class="text-moto-dark-400 text-sm">Type</p>
              <p class="font-semibold text-white">{{ getTypeLabel(moto.type_moto) }}</p>
            </div>
          </div>

          <div class="bg-moto-dark-900 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-white mb-3">Description</h3>
            <p class="text-moto-dark-300">{{ moto.description || 'Aucune description.' }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MotoDetailComponent {
  moto: Moto | null = null;
  defaultImage = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1600';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    const id = Number(this.route.snapshot.params['id']);
    this.api.getMoto(id).subscribe({
      next: (moto: any) => {
        this.moto = moto;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur:', err);
        this.cdr.detectChanges();
      }
    });
  }

  getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'SPORT': 'Sportive', 'ROADSTER': 'Roadster', 'CUSTOM': 'Custom',
      'ENDURO': 'Enduro', 'SCOOTER': 'Scooter', 'GT': 'Grand Tourisme'
    };
    return labels[type] || type;
  }
}