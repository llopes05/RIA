import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule, Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AnimeService } from '../anime.service';
import { Anime } from '../../../models/anime.model';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { AnimeFormComponent } from '../anime-form/anime-form.component';
import { AnimeDeleteComponent } from '../anime-delete/anime-delete.component';
import { AnimeDetailComponent } from '../anime-detail/anime-detail.component';
import { ToolbarModule } from 'primeng/toolbar';
import { InputIcon } from "primeng/inputicon";
import { IconField } from "primeng/iconfield";
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-anime-list',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    TooltipModule,
    DialogModule,
    AnimeFormComponent,
    AnimeDeleteComponent,
    AnimeDetailComponent,
    ToolbarModule,
    InputIcon,
    IconField,
    SplitButtonModule,
    InputTextModule
],
  templateUrl: './anime-list.component.html',
  styleUrl: './anime-list.component.css'
})
export class AnimeListComponent implements OnInit, OnDestroy {
  @ViewChild('dt') dt!: Table;
  animes: Anime[] = [];
  private subscription: Subscription = new Subscription();
  
  // Controle dos dialogs
  showFormDialog = false;
  showDetailDialog = false;
  
  selectedAnime: Anime | null = null;
  selectedAnimeForDelete: Anime | null = null;
  editMode = false;
  items: any;

  constructor(private animeService: AnimeService) { }
  
  ngOnInit(): void {
    this.loadAnimes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadAnimes(){
    this.subscription.add(
      this.animeService.getAll().subscribe({
        next: (animes) => this.animes = animes,
        error: (error) => console.error('Erro ao carregar animes:', error)
      })
    );
  }

  // FILTRO GLOBAL PARA PESQUISA
  onGlobalFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log('Pesquisando por:', input.value);
    this.dt.filterGlobal(input.value, 'contains');
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
      this.subscription.add(
        this.animeService.update(this.selectedAnime.id, animeData).subscribe({
          next: () => {
            console.log('Anime atualizado!');
            this.closeFormDialog();
          },
          error: (error) => console.error('Erro ao atualizar anime:', error)
        })
      );
    } else {
      // CREATE
      this.subscription.add(
        this.animeService.create(animeData).subscribe({
          next: () => {
            console.log('Novo anime criado!');
            this.closeFormDialog();
          },
          error: (error) => console.error('Erro ao criar anime:', error)
        })
      );
    }
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

  // FUNÇÃO DE ORDENAÇÃO CUSTOMIZADA
  customSort(event: any) {
    event.data.sort((data1: any, data2: any) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }

  // MÉTODOS HELPER PARA A TABELA
  getProgressPercentage(anime: Anime): number {
    if (anime.episodios === 0) return 0;
    return Math.round((anime.episodioAtual / anime.episodios) * 100);
  }

  getStatusLabel(status: string): string {
    switch(status) {
      case 'assistido': return 'Assistido';
      case 'assistindo': return 'Assistindo';
      case 'pendente': return 'Pendente';
      default: return 'Desconhecido';
    }
  }

  getStatusSeverity(status: string): string {
    switch(status) {
      case 'assistido': return 'success';
      case 'assistindo': return 'info';
      case 'pendente': return 'warning';
      default: return 'secondary';
    }
  }
}
