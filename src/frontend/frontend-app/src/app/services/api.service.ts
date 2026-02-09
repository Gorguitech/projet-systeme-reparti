import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Moto {
  id: number;
  marque: string;
  modele: string;
  annee: number;
  kilometrage: number;
  prix: number;
  type_moto: string;
  couleur: string;
  description: string;
  vendu: boolean;
  image_url: string | null;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private url = '/api/motos/';

  constructor(private http: HttpClient) {}

  getMotos(): Observable<{results: Moto[]}> {
    return this.http.get<{results: Moto[]}>(this.url);
  }

  getMoto(id: number): Observable<Moto> {
    return this.http.get<Moto>(`${this.url}${id}/`);
  }
}