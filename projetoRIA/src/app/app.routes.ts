import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { 
      path: 'home', 
      loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      canActivate: [authGuard]
    },
    { 
      path: 'animes', 
      loadComponent: () => import('./pages/anime/anime.component').then(m => m.AnimeComponent),
      canActivate: [authGuard]
    },
    { 
      path: 'anime/:id', 
      loadComponent: () => import('./pages/animedetail/animedetail.component').then(m => m.AnimedetailComponent),
      canActivate: [authGuard]
    },
    { 
      path: 'login', 
      loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
      canActivate: [publicGuard]
    },
    { 
      path: 'register', 
      loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
      canActivate: [publicGuard]
    },
    { path: '**', redirectTo: 'home' }
];