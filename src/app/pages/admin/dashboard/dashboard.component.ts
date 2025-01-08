import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SubscriptionService } from '../../../services/subscription.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private auth = inject(AuthService);
  private sub = inject(SubscriptionService);
  constructor(
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.sub.setIsLoggedIn(false);
    this.router.navigateByUrl('login');

  }



}
