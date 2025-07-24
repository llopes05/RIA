import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Anime } from '../../models/anime.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private apiUrl = 'https://effective-meme-x5r7wx5jq5wgcrj7-8000.app.github.dev/api/anime/';
  private animesSubject = new BehaviorSubject<Anime[]>([]);
  public animes$ = this.animesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAnimes();
  }

  private loadAnimes(): void {
    console.log('Fazendo requisição para:', this.apiUrl);
    this.http.get<Anime[]>(this.apiUrl).subscribe({
      next: (animes) => {
        console.log('Dados recebidos da API:', animes);
        this.animesSubject.next(animes);
      },
      error: (error) => {
        console.error('Erro ao carregar animes:', error);
        console.log('URL da API:', this.apiUrl);
        console.log('Erro completo:', error);
      }
    });
  }

  getAll(): Observable<Anime[]> {
    return this.http.get<Anime[]>(this.apiUrl);
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