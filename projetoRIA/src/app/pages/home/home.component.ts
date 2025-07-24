import { Component, OnInit } from '@angular/core';
import { AnimeListComponent } from '../../components/anime/anime-list/anime-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [AnimeListComponent]
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    console.log('Home component iniciado');
  }

}