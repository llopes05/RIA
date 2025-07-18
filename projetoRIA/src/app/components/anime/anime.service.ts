import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Anime } from '../../models/anime.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private apiUrl = 'http://localhost:8000/api/anime/';
  private animesSubject = new BehaviorSubject<Anime[]>([]);
  public animes$ = this.animesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAnimes();
  }

  private loadAnimes(): void {
    this.http.get<Anime[]>(this.apiUrl).subscribe({
      next: (animes) => this.animesSubject.next(animes),
      error: (error) => console.error('Erro ao carregar animes:', error)
    });
  }

  getAll(): Observable<Anime[]> {
    return this.animes$;
  }

  getById(id: number): Observable<Anime> {
    return this.http.get<Anime>(`${this.apiUrl}${id}/`);
  }

  create(anime: Omit<Anime, 'id'>): Observable<Anime> {
    return this.http.post<Anime>(this.apiUrl, anime).pipe(
      tap(() => this.loadAnimes()) // Recarrega a lista após criar
    );
  }

  update(id: number, anime: Omit<Anime, 'id'>): Observable<Anime> {
    return this.http.put<Anime>(`${this.apiUrl}${id}/`, anime).pipe(
      tap(() => this.loadAnimes()) // Recarrega a lista após atualizar
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`).pipe(
      tap(() => this.loadAnimes()) // Recarrega a lista após deletar
    );
  }
}