import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnimeService } from '../../components/anime/anime.service';
import { Anime } from '../../models/anime.model';

@Component({
  selector: 'app-animedetail',
  imports: [CommonModule],
  templateUrl: './animedetail.component.html',
  styleUrl: './animedetail.component.css'
})
export class AnimedetailComponent implements OnInit {
  anime: Anime | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animeService: AnimeService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAnime(+id);
    } else {
      this.error = 'ID do anime não fornecido';
      this.loading = false;
    }
  }

  loadAnime(id: number): void {
    this.animeService.getById(id).subscribe({
      next: (anime) => {
        this.anime = anime;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar os detalhes do anime';
        this.loading = false;
        console.error('Erro:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/animes']);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'assistido':
        return 'green';
      case 'assistindo':
        return 'blue';
      case 'pendente':
        return 'orange';
      default:
        return 'gray';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'assistido':
        return 'Assistido';
      case 'assistindo':
        return 'Assistindo';
      case 'pendente':
        return 'Pendente';
      default:
        return status;
    }
  }

  getStars(nota: number): number[] {
    return Array(5).fill(0).map((_, i) => i < nota ? 1 : 0);
  }
}
