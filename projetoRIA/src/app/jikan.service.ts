import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JikanAnime {
  mal_id: number;
  title: string;
  episodes: number;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

export interface JikanSearchResponse {
  data: JikanAnime[];
}

@Injectable({
  providedIn: 'root'
})
export class JikanService {
  private readonly baseUrl = 'https://api.jikan.moe/v4';

  constructor(private http: HttpClient) { }

  // BUSCAR ANIMES POR NOME
  searchAnime(query: string): Observable<JikanSearchResponse> {
    const params = { q: query };
    return this.http.get<JikanSearchResponse>(`${this.baseUrl}/anime`, { params });
  }
}
