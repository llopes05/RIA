import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AnimeService } from '../anime.service';
import { Anime } from '../../../models/anime.model';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { AnimeFormComponent } from '../anime-form/anime-form.component';
import { AnimeDeleteComponent } from '../anime-delete/anime-delete.component';
import { AnimeDetailComponent } from '../anime-detail/anime-detail.component';

@Component({
  selector: 'app-anime-list',
  imports: [
    TableModule, 
    ButtonModule, 
    TagModule, 
    TooltipModule, 
    DialogModule, 
    AnimeFormComponent, 
    AnimeDeleteComponent,
    AnimeDetailComponent
  ],
  templateUrl: './anime-list.component.html',
  styleUrl: './anime-list.component.css'
})
export class AnimeListComponent implements OnInit {
  animes: Anime[] = [];
  
  // Controle dos dialogs
  showFormDialog = false;
  showDetailDialog = false;
  
  selectedAnime: Anime | null = null;
  selectedAnimeForDelete: Anime | null = null;
  editMode = false;

  constructor(private animeService: AnimeService) { }
  
  ngOnInit(): void {
    this.loadAnimes();
  }

  loadAnimes(){
    this.animes = this.animeService.getAll();
  }

  // NOVO ANIME
  openNewAnimeDialog() {
    this.selectedAnime = null;
    this.editMode = false;
    this.showFormDialog = true;
  }

  // EDITAR ANIME
  onEdit(anime: Anime) {
    this.selectedAnime = anime;
    this.editMode = true;
    this.showFormDialog = true;
  }

  // SALVAR ANIME (CREATE/UPDATE)
  saveAnime(animeData: Omit<Anime, 'id'>) {
    if (this.editMode && this.selectedAnime) {
      // UPDATE
      this.animeService.update(this.selectedAnime.id, animeData);
      console.log('Anime atualizado!');
    } else {
      // CREATE
      this.animeService.create(animeData);
      console.log('Novo anime criado!');
    }
    this.loadAnimes();
    this.closeFormDialog();
    console.log('Lista completa de animes:', this.animeService.getAll());
  }

  // FECHAR DIALOG DE FORMULÁRIO
  closeFormDialog() {
    this.showFormDialog = false;
    // Aguarda um pouco antes de limpar para dar tempo do formulário processar
    setTimeout(() => {
      this.selectedAnime = null;
      this.editMode = false;
    }, 100);
  }

  // DETALHES DO ANIME
  onDetail(anime: Anime) {
    this.selectedAnime = anime;
    this.showDetailDialog = true;
  }

  // FECHAR DIALOG DE DETALHES
  closeDetailDialog() {
    this.showDetailDialog = false;
    this.selectedAnime = null;
  }

  // DELETAR ANIME
  onDelete(anime: Anime) {
    this.selectedAnimeForDelete = anime;
    // O componente AnimeDeleteComponent vai abrir automaticamente o confirm dialog
  }

  // CALLBACK QUANDO ANIME É DELETADO
  onAnimeDeleted(success: boolean) {
    if (success) {
      console.log('Anime deletado com sucesso!');
      this.loadAnimes();
    } else {
      console.log('Operação de exclusão cancelada ou falhou');
    }
    // Sempre limpa o selectedAnimeForDelete após a operação (sucesso ou cancelamento)
    this.selectedAnimeForDelete = null;
  }
}
