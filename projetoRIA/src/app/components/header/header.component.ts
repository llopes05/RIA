import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule, 
    InputTextModule, 
    ButtonModule,
    MenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private subscription: Subscription = new Subscription();
  userMenuItems: MenuItem[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Header inicializado');
    this.subscription.add(
      this.authService.currentUser$.subscribe(user => {
        console.log('Header recebeu usuário:', user);
        this.currentUser = user;
        this.updateUserMenu();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateUserMenu(): void {
    if (this.currentUser) {
      this.userMenuItems = [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => this.logout()
        }
      ];
    } else {
      this.userMenuItems = [];
    }
  }

  login(): void {
    console.log('Navegando para login...');
    this.router.navigate(['/login']);
  }

  register(): void {
    console.log('Navegando para register...');
    this.router.navigate(['/register']);
  }

  logout(): void {
    console.log('Fazendo logout...');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goHome(): void {
    if (this.currentUser) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  goToAnimes(): void {
    if (this.currentUser) {
      this.router.navigate(['/animes']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
