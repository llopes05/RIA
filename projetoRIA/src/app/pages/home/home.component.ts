import { Component } from '@angular/core';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from "../../components/button/button.component";
import { HeaderComponent } from "../../components/header/header.component";
import { AnimeListComponent } from '../../components/anime/anime-list/anime-list.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [SliderModule, FormsModule, SkeletonModule, ButtonModule, HeaderComponent, AnimeListComponent]
})
export class HomeComponent {
  value: number = 50;

  onValueChange(newValue: number): void {
    console.log('Slider value changed:', newValue);
  }
}