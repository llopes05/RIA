import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) }, // Read, Update, Delete
    { path: 'animes', loadComponent: () => import('./pages/anime/anime.component').then(m => m.AnimeComponent) }, // Create
    { path: '**', redirectTo: 'home' }
];
