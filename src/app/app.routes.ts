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
];
