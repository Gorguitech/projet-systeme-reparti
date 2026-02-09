import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

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

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api/motos/';
  private isOnlineSubject = new BehaviorSubject<boolean>(true);
  isOnline$ = this.isOnlineSubject.asObservable();

  constructor(private http: HttpClient) {}

  getMotos(): Observable<Moto[]> {
    return this.http.get<PaginatedResponse<Moto>>(this.apiUrl).pipe(
      map(response => response.results),
      tap(() => this.isOnlineSubject.next(true)),
      catchError((error) => {
        this.isOnlineSubject.next(false);
        return throwError(() => error); 
      })
    );
  }

  getMoto(id: number): Observable<Moto> {
    return this.http.get<Moto>(`${this.apiUrl}${id}/`).pipe(
      tap(() => this.isOnlineSubject.next(true)),
      catchError((error) => {
        this.isOnlineSubject.next(false);
        return throwError(() => error);
      })
    );
  }
}