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
  },
  {
    path: 'admin/alerts',
    loadComponent: () =>
      import('./pages/admin/alerts/alerts.component').then(
        (m) => m.AlertsComponent
      ),
    title: `Papo de Rifa - Comunicados`,
  },
  {
    path: 'admin/support',
    loadComponent: () =>
      import('./pages/admin/support/support.component').then(
        (m) => m.SupportComponent
      ),
    title: `Papo de Rifa - Suporte`,
  }
];
