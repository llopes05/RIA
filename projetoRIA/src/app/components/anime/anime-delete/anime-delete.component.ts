import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Anime } from '../../../models/anime.model';
import { AnimeService } from '../anime.service';

@Component({
  selector: 'app-anime-delete',
  imports: [ConfirmDialogModule],
  templateUrl: './anime-delete.component.html',
  styleUrl: './anime-delete.component.css',
  providers: [ConfirmationService]
})
export class AnimeDeleteComponent implements OnChanges {
  @Input() anime: Anime | null = null;
  @Output() onDelete = new EventEmitter<boolean>();

  constructor(
    private animeService: AnimeService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    // quando o anime muda e não é null, abre automaticamente o dialog de confirmação
    if (changes['anime'] && this.anime) {
      this.confirmDelete();
    }
  }

  confirmDelete() {
    if (!this.anime) return;

    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o anime "${this.anime.nome}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        if (this.anime) {
          this.animeService.delete(this.anime.id).subscribe({
            next: () => {
              console.log('Anime deletado com sucesso!');
              this.onDelete.emit(true);
            },
            error: (error) => {
              console.error('Erro ao deletar anime:', error);
              this.onDelete.emit(false);
            }
          });
        }
      },
      reject: () => {
        console.log('Exclusão cancelada');
        this.onDelete.emit(false);
      }
    });
  }
}
