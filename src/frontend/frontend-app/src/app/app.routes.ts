import { Routes } from '@angular/router';
import { MotoListComponent } from './components/moto-list/moto-list';
import { MotoDetailComponent } from './components/moto-detail/moto-detail';

export const routes: Routes = [
  { 
    path: '', 
    component: MotoListComponent  // Affiche directement la liste à la racine
  },
  { path: 'motos', component: MotoListComponent },
  { path: 'motos/:id', component: MotoDetailComponent },
  { path: '**', redirectTo: '' }
];