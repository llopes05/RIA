import { Injectable } from '@angular/core';
import { Anime } from '../../models/anime.model';
@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private animes: Anime[] = [
  { id:1, nome: 'Naruto', episodios: 220, assistido: false },
  { id:2, nome: 'One Piece', episodios: 1080, assistido: true },
  { id:3, nome: 'Attack on Titan', episodios: 75, assistido: false },
  ];
  private nextId: number = 4;

  getAll(): Anime[] {
    return this.animes;
  }

  getById(id: number): Anime | undefined {
    return this.animes.find(anime => anime.id === id);
  }

  create(anime: Omit<Anime, 'id'>): Anime {
    const newAnime: Anime = {
      ...anime,
      id: this.nextId++
    };
    this.animes.push(newAnime);
    return newAnime;

  }

  update(id: number, anime: Omit<Anime, 'id'>): Anime | null {
    const index = this.animes.findIndex(a => a.id === id);
    if (index !== -1) {
      this.animes[index] = { ...anime, id };
      return this.animes[index];
    }
    return null;
  }

  delete(id: number): boolean {
    const index = this.animes.findIndex(a => a.id === id);
    if (index !== -1) {
      this.animes.splice(index, 1);
      return true;
    }
    return false;
  }
}


  