import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Anime } from '../../../models/anime.model';

@Component({
  selector: 'app-anime-detail',
  imports: [CommonModule, CardModule, TagModule, ButtonModule],
  templateUrl: './anime-detail.component.html',
  styleUrl: './anime-detail.component.css'
})
export class AnimeDetailComponent {
  @Input() anime: Anime | null = null;
  @Output() onClose = new EventEmitter<void>();

  close() {
    this.onClose.emit();
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
