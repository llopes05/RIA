import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AnimeService } from '../anime.service';
import { Anime } from '../../../models/anime.model';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { AnimeFormComponent } from '../anime-form/anime-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-anime-list',
  imports: [TableModule, ButtonModule, TagModule, TooltipModule, DialogModule, AnimeFormComponent, ConfirmDialogModule],
  templateUrl: './anime-list.component.html',
  styleUrl: './anime-list.component.css',
  providers: [ConfirmationService]
})
export class AnimeListComponent implements OnInit {
  animes: Anime[] = [];
  showDialog = false;
  selectedAnime: Anime | null = null;
  editMode = false;

  constructor(private animeService: AnimeService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.loadAnimes();
  }

  loadAnimes(){
    this.animes = this.animeService.getAll();
  }

  openNewAnimeDialog() {
    this.selectedAnime = null;
    this.editMode = false;
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    this.selectedAnime = null;
  }

  saveAnime(animeData: Omit<Anime, 'id'>) {
    if (this.editMode && this.selectedAnime) {
      // atualizar // UPDATE
      this.animeService.update(this.selectedAnime.id, animeData);
      console.log('Anime atualizado!');
    } else {
      // criar novo // CREATE
      this.animeService.create(animeData);
      console.log('Novo anime criado!');
    }
    this.loadAnimes();
    this.closeDialog();
    
    // array salvo localmente no navegador
    console.log('Lista completa de animes:', this.animeService.getAll());
  }

  onEdit(anime: Anime) {
    this.selectedAnime = anime;
    this.editMode = true;
    this.showDialog = true;
  }

  onDetail(anime: Anime) {
    console.log('Detail anime:', anime);
  }

  //apaga // DELETE
  onDelete(anime: Anime) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o anime "${anime.nome}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        const success = this.animeService.delete(anime.id);
        if (success) {
          console.log('Anime deletado:', anime.nome);
          this.loadAnimes();
          console.log('Lista atualizada:', this.animeService.getAll());
        } else {
          console.log('Erro ao deletar anime');
        }
      },
      reject: () => {
        console.log('Exclusão cancelada');
      }
    });
  }


  
}
