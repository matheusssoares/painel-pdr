import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent,
    title: 'Papo de Rifa - Login',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: `Papo de Rifa - Login`,
  },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./pages/admin/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    title: `Papo de Rifa - Dashboard`,
  },
  {
    path: 'admin/raffles',
    loadComponent: () =>
      import('./pages/admin/raffles/raffles.component').then(
        (m) => m.RafflesComponent
      ),
    title: `Papo de Rifa - Campanhas`,
  }
];
