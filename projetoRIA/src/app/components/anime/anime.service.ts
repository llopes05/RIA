import { Injectable } from '@angular/core';
import { Anime } from '../../models/anime.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private storageKey = 'animes-list';
  private animes: Anime[] = [];
  private nextId: number = 1;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.animes = JSON.parse(saved);
      this.nextId = Math.max(...this.animes.map(a => a.id), 0) + 1;
    } else {
      // Dados iniciais apenas se não houver nada salvo
      this.animes = [
        { 
          id: 1, 
          nome: 'Naruto', 
          episodios: 220, 
          episodioAtual: 150, 
          nota: 9, 
          status: 'assistindo' 
        },
        { 
          id: 2, 
          nome: 'One Piece', 
          episodios: 1080, 
          episodioAtual: 800, 
          nota: 10, 
          status: 'assistindo' 
        },
        { 
          id: 3, 
          nome: 'Attack on Titan', 
          episodios: 75, 
          episodioAtual: 0, 
          nota: 0, 
          status: 'pendente' 
        }
      ];
      this.nextId = 4;
      this.saveToStorage();
    }
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.animes));
  }

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
    this.saveToStorage();
    return newAnime;
  }

  update(id: number, anime: Omit<Anime, 'id'>): Anime | null {
    const index = this.animes.findIndex(a => a.id === id);
    if (index !== -1) {
      this.animes[index] = { ...anime, id };
      this.saveToStorage();
      return this.animes[index];
    }
    return null;
  }

  delete(id: number): boolean {
    const index = this.animes.findIndex(a => a.id === id);
    if (index !== -1) {
      this.animes.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }
}