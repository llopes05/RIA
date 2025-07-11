import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { JikanService, JikanAnime } from '../../jikan.service';
import { AnimeService } from '../../components/anime/anime.service';
import { AnimeFormComponent } from '../../components/anime/anime-form/anime-form.component';
import { Anime } from '../../models/anime.model';

@Component({
  selector: 'app-anime',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    DialogModule,
    InputIcon,
    IconField,
    AnimeFormComponent
  ],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.css'
})
export class AnimeComponent {
  searchQuery = '';
  searchResults: JikanAnime[] = [];
  isLoading = false;
  
  // Controle do formulário
  showFormDialog = false;
  selectedJikanAnime: JikanAnime | null = null;
  formAnimeData: Anime | null = null;

  constructor(
    private jikanService: JikanService,
    private animeService: AnimeService
  ) { }

  searchAnimes() {
    if (!this.searchQuery.trim()) return;
    
    this.isLoading = true;
    this.jikanService.searchAnime(this.searchQuery).subscribe({
      next: (response) => {
        this.searchResults = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao buscar animes:', error);
        this.isLoading = false;
      }
    });
  }

  openFormForAnime(jikanAnime: JikanAnime) {
    this.selectedJikanAnime = jikanAnime;
    
    // cria o objeto do anime uma única vez quando o dialog é aberto
    this.formAnimeData = {
      id: 0, // ID temporário, será gerado pelo service
      nome: jikanAnime.title,
      episodios: jikanAnime.episodes || 0,
      episodioAtual: 0,
      nota: 0,
      status: 'pendente'
    };
    
    this.showFormDialog = true;
  }

  saveAnime(animeData: Omit<Anime, 'id'>) {
    this.animeService.create(animeData);
    console.log('Anime adicionado:', animeData);
    
    // Feedback e fechar
    alert(`"${animeData.nome}" foi adicionado à sua lista! Vá para a página Home para ver.`);
    this.closeFormDialog();
    
    // Remove da lista de resultados
    if (this.selectedJikanAnime) {
      this.searchResults = this.searchResults.filter(a => a.mal_id !== this.selectedJikanAnime!.mal_id);
    }
  }

  closeFormDialog() {
    this.showFormDialog = false;
    this.selectedJikanAnime = null;
    this.formAnimeData = null;
  }

}
